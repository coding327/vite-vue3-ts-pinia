import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user", // 唯一标识符
  state: () => ({
    name: "John Doe",
  }),
  actions: {
    setName(name: string) {
      this.name = name;
    },
  },
});
