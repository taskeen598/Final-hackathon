import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../auth/schema/user.schemas';
import { FakeNews } from './schema/fakenews.schema';
import { Newsdata } from './schema/newsdata.schema';
import { Reaction } from './schema/reaction.schema';

@Injectable()
export class FakeNewsService {
  constructor(
    @InjectModel(FakeNews.name)
    private fakeNewsModel: mongoose.Model<FakeNews>,
    @InjectModel(Newsdata.name)
    private newsdataModel: mongoose.Model<Newsdata>,
    @InjectModel(Reaction.name)
    private reactionModel: mongoose.Model<Reaction>,
  ) {}

  async getAuthorAnalytics() {
    const startDate = new Date('2016-10-26');
    const endDate = new Date('2016-11-26');

    const intervalDays = 4;
    const intervals = [];

    for (
      let currentDate = new Date(startDate);
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + intervalDays)
    ) {
      intervals.push(new Date(currentDate));
    }

    const pipelines = intervals.map((intervalStartDate, index) => {
      const intervalEndDate = new Date(intervalStartDate);
      intervalEndDate.setDate(intervalEndDate.getDate() + intervalDays);

      return {
        $match: {
          author: {
            $in: [
              'Whitney Webb',
              'Brianna Acuesta',
              'True Activist',
              'Amanda Froelich',
              'Anonymous Activist',
            ],
          },
          published: { $gte: intervalStartDate, $lt: intervalEndDate },
        },
      };
    });

    const results = await Promise.all(
      pipelines.map(async (pipeline) => {
        const result = await this.fakeNewsModel.aggregate([
          pipeline,
          { $group: { _id: '$author', count: { $sum: 1 } } },
        ]);

        return result;
      }),
    );

    const dates = intervals.map((interval) => interval.toISOString());

    const WhitneyCounts = results.map(
      (result) =>
        result.find((item) => item._id === 'Whitney Webb')?.count || 0,
    );
    const BriannaCounts = results.map(
      (result) =>
        result.find((item) => item._id === 'Brianna Acuesta')?.count || 0,
    );
    const TrueCounts = results.map(
      (result) =>
        result.find((item) => item._id === 'True Activist')?.count || 0,
    );
    const AmandaCounts = results.map(
      (result) =>
        result.find((item) => item._id === 'Amanda Froelich')?.count || 0,
    );
    const AnonymousCounts = results.map(
      (result) =>
        result.find((item) => item._id === 'Anonymous Activist')?.count || 0,
    );

    return {
      dates,
      WhitneyCounts,
      AnonymousCounts,
      AmandaCounts,
      TrueCounts,
      BriannaCounts,
    };
  }

  async totalNumbers() {
    const countryData = await this.fakeNewsModel.aggregate([
      {
        $lookup: {
          from: 'newsdatas',
          localField: 'reference',
          foreignField: '_id',
          as: 'newsdatas',
        },
      },
      {
        $unwind: '$newsdatas',
      },
      {
        $group: {
          _id: '$newsdatas.country',
          count: { $sum: 1 },
        },
      },
    ]);
    const siteUrlData = await this.fakeNewsModel.aggregate([
      {
        $lookup: {
          from: 'newsdatas',
          localField: 'reference',
          foreignField: '_id',
          as: 'newsdatas',
        },
      },
      {
        $unwind: '$newsdatas',
      },
      {
        $group: {
          _id: '$newsdatas.site_url',
          count: { $sum: 1 },
        },
      },
    ]);
    const languageData = await this.fakeNewsModel.aggregate([
      {
        $group: {
          _id: '$language',
          count: { $sum: 1 },
        },
      },
    ]);
    return { countryData, siteUrlData, languageData };
  }

  async getGraphs() {
    const startDate = new Date('2016-10-26');
    const endDate = new Date('2016-11-26');
    const intervalDays = 4;
    const intervals = [];
    for (
      let currentDate = new Date(startDate);
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + intervalDays)
    ) {
      intervals.push(new Date(currentDate));
    }

    const countryPipelines = intervals.map((intervalStartDate, index) => {
      const intervalEndDate = new Date(intervalStartDate);
      intervalEndDate.setDate(intervalEndDate.getDate() + intervalDays);
      return {
        $match: {
          crawled: { $gte: intervalStartDate, $lt: intervalEndDate },
        },
      };
    });
    const siteUrlPipelines = intervals.map((intervalStartDate, index) => {
      const intervalEndDate = new Date(intervalStartDate);
      intervalEndDate.setDate(intervalEndDate.getDate() + intervalDays);

      return {
        $match: {
          crawled: { $gte: intervalStartDate, $lt: intervalEndDate },
        },
      };
    });
    const languagePipelines = intervals.map((intervalStartDate, index) => {
      const intervalEndDate = new Date(intervalStartDate);
      intervalEndDate.setDate(intervalEndDate.getDate() + intervalDays);

      return {
        $match: {
          crawled: { $gte: intervalStartDate, $lt: intervalEndDate },
        },
      };
    });
    const [countryData, siteUrlData, languageData] = await Promise.all([
      Promise.all(
        countryPipelines.map((pipeline) =>
          this.fakeNewsModel.aggregate([
            pipeline,
            {
              $lookup: {
                from: 'newsdatas',
                localField: 'reference',
                foreignField: '_id',
                as: 'newsdatas',
              },
            },
            {
              $unwind: '$newsdatas',
            },
            {
              $group: {
                _id: '$newsdatas.country',
                count: { $sum: 1 },
              },
            },
          ]),
        ),
      ),
      Promise.all(
        siteUrlPipelines.map((pipeline) =>
          this.fakeNewsModel.aggregate([
            pipeline,
            {
              $lookup: {
                from: 'newsdatas',
                localField: 'reference',
                foreignField: '_id',
                as: 'newsdatas',
              },
            },
            {
              $unwind: '$newsdatas',
            },
            {
              $group: {
                _id: '$newsdatas.site_url',
                count: { $sum: 1 },
              },
            },
          ]),
        ),
      ),
      Promise.all(
        languagePipelines.map((pipeline) =>
          this.fakeNewsModel.aggregate([
            pipeline,
            {
              $group: {
                _id: '$language',
                count: { $sum: 1 },
              },
            },
          ]),
        ),
      ),
    ]);
    languageData.forEach((e) => {
      console.log(e.find((item) => item._id === 'english')?.count || 0);
    });
    const languageCounts = [
      {
        english: [],
        french: [],
        spanish: [],
        turkish: [],
      },
    ];
    languageData.map((e) => {
      languageCounts[0].english.push(
        e.find((item) => item._id === 'english')?.count || 0,
      );
      languageCounts[0].french.push(
        e.find((item) => item._id === 'french')?.count || 0,
      );
      languageCounts[0].spanish.push(
        e.find((item) => item._id === 'spanish')?.count || 0,
      );
      languageCounts[0].turkish.push(
        e.find((item) => item._id === 'turkish')?.count || 0,
      );
    });
    // country
    const countryCounts = [
      {
        BG: [],
        US: [],
        GB: [],
        LI: [],
      },
    ];
    countryData.map((e) => {
      countryCounts[0].LI.push(e.find((item) => item._id === 'LI')?.count || 0);
      countryCounts[0].BG.push(e.find((item) => item._id === 'BG')?.count || 0);
      countryCounts[0].US.push(e.find((item) => item._id === 'US')?.count || 0);
      countryCounts[0].GB.push(e.find((item) => item._id === 'GB')?.count || 0);
    });
    // Url site count
    const urlSiteCounts = [
      {
        'topinfopost.com': [],
        'truthdig.com': [],
        'wnd.com': [],
        'truth-out.org': [],
      },
    ];
    siteUrlData.map((e) => {
      urlSiteCounts[0]['topinfopost.com'].push(
        e.find((item) => item._id === 'topinfopost.com')?.count || 0,
      );
      urlSiteCounts[0]['truth-out.org'].push(
        e.find((item) => item._id === 'truth-out.org')?.count || 0,
      );
      urlSiteCounts[0]['truthdig.com'].push(
        e.find((item) => item._id === 'truthdig.com')?.count || 0,
      );
      urlSiteCounts[0]['wnd.com'].push(
        e.find((item) => item._id === 'wnd.com')?.count || 0,
      );
    });
    const dates = intervals.map((interval) => interval.toISOString());
    return { dates, languageCounts, countryCounts, urlSiteCounts };
  }

  async userReaction(id: string, user: User): Promise<Reaction> {
    const reaction = await this.reactionModel.find({
      fakenews: id,
      user: user._id,
    });
    console.log('This is reaction', reaction);

    console.log(reaction.length === 0);

    if (reaction.length === 0) {
      const newReaction = await this.reactionModel.create({
        fakenews: id,
        user: user._id,
      });
      const fakeNews = await this.fakeNewsModel.findById(id);
      fakeNews.likes.push(newReaction._id);
      await fakeNews.save();
      return newReaction;
    } else {
      const deletedReaction = await this.reactionModel.findByIdAndDelete(
        reaction[0]._id,
      );
      const blog = await this.fakeNewsModel.findById(id);
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== deletedReaction._id.toString(),
      );

      console.log('blog', blog.likes);
      await blog.save();
      return deletedReaction;
    }
  }

  async findAll(
    user: User,
    page = 1,
    limit = 12,
  ): Promise<{ articles: FakeNews[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const articles = await this.fakeNewsModel
      .find()
      .populate('reference')
      .skip(skip)
      .limit(limit);
    const totalCount = await this.fakeNewsModel.countDocuments();
    return { articles, totalCount };
  }

  async findOne(id: string, user: User): Promise<FakeNews> {
    const article = await this.fakeNewsModel.findOne({ _id: id });
    return article;
  }

  async updateTable1WithReferences(): Promise<void> {
    try {
      const table1Docs = await this.fakeNewsModel.find().lean();

      console.log(table1Docs);

      for (const table1Doc of table1Docs) {
        console.log('New Document updated');

        if (!Array.isArray(table1Doc.comments)) {
          table1Doc.comments = [];
        }

        if (!Array.isArray(table1Doc.likes)) {
          table1Doc.likes = [];
        }

        await this.fakeNewsModel.findByIdAndUpdate(table1Doc._id, {
          $set: { comments: table1Doc.comments, likes: table1Doc.likes },
        });

        console.log('Updated data', table1Doc);
      }

      console.log('Table 1 updated with modified fields.');
    } catch (error) {
      console.error('Error updating Table 1 with modified fields:', error);
      throw new Error(
        'An error occurred while updating Table 1 with modified fields.',
      );
    }
  }

  // async totalStats() {
  //   const startDate = new Date('2016-10-26');
  //   const endDate = new Date('2016-11-26');// Adjust start date to one month ago

  //   // Define the interval duration in days
  //   const intervalDays = 4;

  //   // Create an empty array to store interval dates
  //   const intervals = [];

  //   // Create intervals of dates with the specified duration
  //   for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + intervalDays)) {
  //     intervals.push(new Date(currentDate));
  //   }

  //   // Define MongoDB aggregation pipelines for each interval
  //   const countryPipelines = intervals.map((intervalStartDate, index) => {
  //     // Calculate the end date of the current interval
  //     const intervalEndDate = new Date(intervalStartDate);
  //     intervalEndDate.setDate(intervalEndDate.getDate() + intervalDays);

  //     // Define a $match stage to filter documents within the current interval
  //     return {
  //       $match: {
  //         crawled: { $gte: intervalStartDate, $lt: intervalEndDate }
  //       }
  //     };
  //   });

  //   const siteUrlPipelines = intervals.map((intervalStartDate, index) => {
  //     // Calculate the end date of the current interval
  //     const intervalEndDate = new Date(intervalStartDate);
  //     intervalEndDate.setDate(intervalEndDate.getDate() + intervalDays);

  //     // Define a $match stage to filter documents within the current interval
  //     return {
  //       $match: {
  //         crawled: { $gte: intervalStartDate, $lt: intervalEndDate }
  //       }
  //     };
  //   });

  //   const languagePipelines = intervals.map((intervalStartDate, index) => {
  //     // Calculate the end date of the current interval
  //     const intervalEndDate = new Date(intervalStartDate);
  //     intervalEndDate.setDate(intervalEndDate.getDate() + intervalDays);

  //     // Define a $match stage to filter documents within the current interval
  //     return {
  //       $match: {
  //         crawled: { $gte: intervalStartDate, $lt: intervalEndDate }
  //       }
  //     };
  //   });

  //   // Execute MongoDB aggregation for each pipeline asynchronously and collect results
  //   const [countryData, siteUrlData, languageData] = await Promise.all([
  //     Promise.all(countryPipelines.map(pipeline => this.fakeNewsModel.aggregate([
  //       pipeline,
  //       {
  //         $lookup: {
  //           from: "newsdatas",
  //           localField: "reference",
  //           foreignField: "_id",
  //           as: "newsdatas"
  //         }
  //       },
  //       {
  //         $unwind: "$newsdatas"
  //       },
  //       {
  //         $group: {
  //           _id: "$newsdatas.country",
  //           count: { $sum: 1 }
  //         }
  //       }
  //     ]))),
  //     Promise.all(siteUrlPipelines.map(pipeline => this.fakeNewsModel.aggregate([
  //       pipeline,
  //       {
  //         $lookup: {
  //           from: "newsdatas",
  //           localField: "reference",
  //           foreignField: "_id",
  //           as: "newsdatas"
  //         }
  //       },
  //       {
  //         $unwind: "$newsdatas"
  //       },
  //       {
  //         $group: {
  //           _id: "$newsdatas.site_url",
  //           count: { $sum: 1 }
  //         }
  //       }
  //     ]))),
  //     Promise.all(languagePipelines.map(pipeline => this.fakeNewsModel.aggregate([
  //       pipeline,
  //       {
  //         $group: {
  //           _id: "$language",
  //           count: { $sum: 1 }
  //         }
  //       }
  //     ])))
  //   ]);

  //   languageData.forEach(e => {
  //     console.log(
  //       e.find(item => item._id === 'english')?.count || 0
  //     );

  //   })

  //   const languageCounts = [{
  //     english: [],
  //     french: [],
  //     spanish: [],
  //     turkish: []
  //   }]
  //   languageData.map(e => {
  //     languageCounts[0].english.push(e.find(item => item._id === 'english')?.count || 0)
  //     languageCounts[0].french.push(e.find(item => item._id === 'french')?.count || 0)
  //     languageCounts[0].spanish.push(e.find(item => item._id === 'spanish')?.count || 0)
  //     languageCounts[0].turkish.push(e.find(item => item._id === 'turkish')?.count || 0)
  //   })

  //   // country
  //   const countryCounts = [{
  //     BG: [],
  //     US: [],
  //     GB: [],
  //     LI: []
  //   }]
  //   countryData.map(e => {
  //     countryCounts[0].LI.push(e.find(item => item._id === 'LI')?.count || 0)
  //     countryCounts[0].BG.push(e.find(item => item._id === 'BG')?.count || 0)
  //     countryCounts[0].US.push(e.find(item => item._id === 'US')?.count || 0)
  //     countryCounts[0].GB.push(e.find(item => item._id === 'GB')?.count || 0)
  //   })

  //   // Url site count
  //   const urlSiteCounts = [{
  //     "topinfopost.com": [],
  //     "truthdig.com": [],
  //     "wnd.com": [],
  //     "truth-out.org": []
  //   }]
  //   siteUrlData.map(e => {
  //     urlSiteCounts[0]['topinfopost.com'].push(e.find(item => item._id === 'topinfopost.com')?.count || 0)
  //     urlSiteCounts[0]['truth-out.org'].push(e.find(item => item._id === 'truth-out.org')?.count || 0)
  //     urlSiteCounts[0]['truthdig.com'].push(e.find(item => item._id === 'truthdig.com')?.count || 0)
  //     urlSiteCounts[0]['wnd.com'].push(e.find(item => item._id === 'wnd.com')?.count || 0)
  //   })

  //   // Extract dates from intervals array and format them as ISO strings
  //   const dates = intervals.map(interval => interval.toISOString());

  //   return { dates,languageCounts, countryCounts,urlSiteCounts};
  // }

  // async updateTable1WithReferences(): Promise<void> {
  //   try {
  //     const table1Docs = await this.fakeNewsModel.find().limit(10).lean(); // Convert to plain JavaScript objects
  //     const table2Docs = await this.newsdataModel.find().limit(10).lean();

  //     console.log(table1Docs);

  //     for (const table1Doc of table1Docs) {
  //       const correspondingTable2Doc = table2Docs.find(doc => doc.uuid === table1Doc.uuid);
  //       console.log("new waiting");

  //       if (correspondingTable2Doc) {
  //         console.log("New Document updated");

  //         // Dynamically add the 'reference' field to the document
  //         table1Doc.reference = correspondingTable2Doc._id;

  //         // Save the modified document
  //         await this.fakeNewsModel.findByIdAndUpdate(table1Doc._id, { $set: { reference: correspondingTable2Doc._id } });

  //         console.log("updated data", table1Doc);
  //       }
  //     }
  //     console.log('Table 1 updated with references to Table 2.');
  //   } catch (error) {
  //     console.error('Error updating Table 1 with references:', error);
  //     throw new Error('An error occurred while updating Table 1 with references.');
  //   }
  // }
}
