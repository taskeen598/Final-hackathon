import { Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FakeNewsService } from './fake.news.service';

@Controller('fake-news')
export class FakeNewsController {
  constructor(private readonly fakenewsService: FakeNewsService) { }

  @Get()
  async findAll(@Req() req: any, @Query('page') page = 1, @Query('limit') limit = 12) {
    return this.fakenewsService.findAll(req.user, page, limit);
  }


  @Get('analytics-stats')
  async getAnalyticsStats() {
    return await this.fakenewsService.getGraphs()
  }
  @Get('total-stats')
  async getTotalStats() {
    return await this.fakenewsService.totalNumbers()
  }

  @Post('give-reaction/:id')
  @UseGuards(JwtAuthGuard)
  giveReaction(@Param('id') id: string, @Req() req: any) {
    return this.fakenewsService.userReaction(id, req.user);
  }

  @Get('get-one/:id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.fakenewsService.findOne(id, req.user);
  }

  @Post('update-table')
  async updateTable1WithReferences(): Promise<{ message: string }> {
    try {
      await this.fakenewsService.updateTable1WithReferences();
      
      return { message: 'Table 1 updated with references to Table 2.' };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while updating Table 1 with references.');
    }
  }

  @Get('analytics')
  async getAnalytics() {
    return await this.fakenewsService.getAuthorAnalytics()
  }
}
