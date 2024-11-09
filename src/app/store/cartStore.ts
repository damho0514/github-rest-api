import { create } from "zustand";
import { GitHubSearchResponse, GitHubUser } from "../lib/getData";

type CartState = {
  items: GitHubUser[];
  selectedItemIds: string[]; // 선택된 아이템 ID를 배열로 변경
  addToCart: (user: GitHubUser) => void;
  loadCart: () => void; // 로컬 스토리지에서 로드하는 함수
  toggleSelectItem: (id: string) => void; // 선택 상태 토글 함수 추가
};

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  selectedItemIds: [], // 초기값은 빈 배열
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === product.id
      );

      if (existingItem) {
        // 이미 존재하는 아이템일 경우, 아무것도 하지 않음
        return state;
      }

      const updatedItems = [
        ...get().items,
        {
          login: product.login,
          id: product.id,
          type: product.type,
          avatar_url: product.avatar_url,
        },
      ];

      // 로컬 스토리지에 저장
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return { items: updatedItems };
    });
  },
  loadCart: () => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      set({ items: JSON.parse(storedItems) });
    }

    const storedSelectedIds = localStorage.getItem("selectedItemIds");
    if (storedSelectedIds) {
      set({ selectedItemIds: JSON.parse(storedSelectedIds) });
    }
  },
  toggleSelectItem: (id) =>
    set((state) => {
      const isSelected = state.selectedItemIds.includes(id);

      // 선택 해제 시 아이템 삭제 및 선택 ID 업데이트
      const updatedSelectedIds = isSelected
        ? state.selectedItemIds.filter((itemId) => itemId !== id) // 선택 해제
        : [...state.selectedItemIds, id]; // 선택 추가

      const updatedItems = isSelected
        ? state.items.filter((item) => item.login !== id) // 아이템 삭제
        : state.items; // 아이템은 그대로 유지

      // 로컬 스토리지에 선택된 아이템 ID와 아이템 저장
      localStorage.setItem(
        "selectedItemIds",
        JSON.stringify(updatedSelectedIds)
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return { selectedItemIds: updatedSelectedIds, items: updatedItems };
    }),
}));

export default useCartStore;
