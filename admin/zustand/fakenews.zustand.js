import { create } from "zustand";

const domain = "http://localhost:3004";

const FakeNewsStore = (set) => ({
  fakeNews: [],
  singleNews: {},
  analytics: {},
  totalCountries: [],
  totalLanguages: [],
  totalSites: [],
  getTotal: 0,
  getAllFakeNews: async (page) => {
    try {
      let localAuth = localStorage.getItem("Auth");
      localAuth = JSON.parse(localAuth);
      const res = await fetch(`${domain}/fake-news?page=${page}`, {
        method: "GET",
      });
      const fakeNewsData = await res.json();
      console.log(fakeNewsData);
      set({
        fakeNews: fakeNewsData.articles,
        getTotal: fakeNewsData.totalCount
      });
      return { fakeNewsData };
    } catch (error) {
      console.log(error);
    }
  },

  handleReaction: async (fakeNewId) => set(async (state) => {
    try {
      let localAuth = localStorage.getItem('Auth');
      localAuth = JSON.parse(localAuth);
      const res = await fetch(`${domain}/fake-news/give-reaction/${fakeNewId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${localAuth?.state?.token}`
        }
      });
      const reactions = await res.json();
      console.log(reactions);
      state.getSingleNews(fakeNewId)
    } catch (error) {
      console.log(error);
    }
  }),

  getTotalStats: async () => {
    try {
      const res = await fetch(`${domain}/fake-news/total-stats`);
      const data = await res.json()
      console.log(data);
      set({
        totalCountries: data.countryData,
        totalLanguages: data.languageData,
        totalSites: data.siteUrlData
      })
    } catch (error) {
      console.log(error);
    }
  },
  getTotalAnalyticsStats: async () => {
    try {
      const res = await fetch(`${domain}/fake-news/analytics-stats`);
      const data = await res.json()
      console.log(data);
      set({
        analytics: data
      })
    } catch (error) {
      console.log(error);
    }
  },
  getSingleNews: async (id) => {
    console.log("this is single id", id);
    let localAuth = localStorage.getItem("Auth");
    localAuth = JSON.parse(localAuth);
    try {
      const res = await fetch(`${domain}/fake-news/get-one/${id}`, {
        method: "GET",
      });
      const fakeNews = await res.json();
      console.log(fakeNews);
      set({
        singleNews: fakeNews,
      });

      return { fakeNews };
    } catch (error) {
      console.log(error);
    }
  },
});

const useFakeNewsStore = create(FakeNewsStore);
export default useFakeNewsStore;