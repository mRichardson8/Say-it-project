const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("index.html", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  describe("head", () => {
    test("it has a title", () => {
      const title = document.querySelector("head title");
      expect(title).toBeTruthy();
      expect(title.textContent).toBe("Say it!");
    });
  });

  describe("body", () => {
    describe("heading", () => {
      let heading;

      beforeEach(() => {
        heading = document.querySelector("h1");
      });

      test("it exists", () => {
        expect(heading).toBeTruthy();
      });

      test("it has a call to action", () => {
        expect(heading.textContent.toLowerCase()).toContain("say it!");
      });
    });

    describe("form", () => {
      let form;
      let titleInput, formImg, formTextArea, gifBtn, postBtn;
      beforeEach(() => {
        form = document.querySelector("#new-post-form");
        titleInput = form.querySelector("#form-title");
        formImg = form.querySelector("#form-img");
        formTextArea = form.querySelector("#form-text");
        gifBtn = form.querySelector('[type="button"]');
        postBtn = form.querySelector('[type="submit"]');
      });

      test("it exists", () => {
        expect(form).toBeTruthy();
      });

      describe("title input", () => {
        test('it has an id of "form-title"', () => {
          expect(titleInput).toBeTruthy();
        });

        test('it is a text input"', () => {
          expect(titleInput.getAttribute("type")).toBe("text");
        });

        test('it has a placeholder"', () => {
          expect(titleInput.getAttribute("placeholder")).toBeTruthy();
        });
      });

      describe("form image", () => {
        test('it has an id of "form-img"', () => {
          expect(formImg).toBeTruthy();
        });
      });

      describe("textarea", () => {
        test('it has an id of "form-text"', () => {
          expect(formTextArea).toBeTruthy();
        });

        test('it has a placeholder"', () => {
          expect(titleInput.getAttribute("placeholder")).toBeTruthy();
        });
      });

      describe("gif button", () => {
        test('it says "GIF"', () => {
          expect(gifBtn.textContent).toBe("GIF");
        });

        test('it has a button type"', () => {
          expect(gifBtn.getAttribute("type")).toBe("button");
        });
      });

      describe("post button", () => {
        test('it says "Post"', () => {
          expect(postBtn.textContent).toBe("Post");
        });

        test('it has a submit type"', () => {
          expect(postBtn.getAttribute("type")).toBe("submit");
        });
      });
    });

    test("it has a section to display posts", () => {
      expect(document.querySelector("section#post-list")).toBeTruthy();
    });
  });
});
