import { create } from "zustand";

const domain = "http://localhost:3004";

const ReactionStore = (set) => ({

    handleReaction: async (fakeNewId) => set(async (state) => {
        try {
            let localAuth = localStorage.getItem('Auth');
            localAuth = JSON.parse(localAuth);
            const res = await fetch(`${domain}/fake-news/give-reaction/${fakeNewId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDFjZDNlOGFkYzExN2U0ODBlZmVkZSIsImlhdCI6MTcwODI0ODM4MywiZXhwIjoxNzA4NTA3NTgzfQ.j7CQl5Q2z1F1F_DxwIr9Vp9Dc5voQXws3RZbSSlzaMM`
                }
            });
            const reactions = await res.json();
            console.log(reactions);
        } catch (error) {
            console.log(error);
        }
    })
});

const useReactionStore = create(ReactionStore);
export default useReactionStore;

// bearer ${localAuth.state.token}