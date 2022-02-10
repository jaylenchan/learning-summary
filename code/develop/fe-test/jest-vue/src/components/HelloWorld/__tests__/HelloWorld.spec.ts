import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld/index.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

  it("render props", () => {
    const root = document.createElement("div");
    root.className = "root";
    root.innerHTML = "root";
    document.body.appendChild(root);
    expect(document.body.querySelector(".root")?.innerHTML).toBe("root");
  });
});
