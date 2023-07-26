export const categories = {
  Thought: `<img class="w-8 h-8 inline my-2" src="./src/icons/thought.svg" alt="thoughts-ico"/>`,
  Task: `<img class="w-8 h-8 inline my-2" src="./src/icons/cart.svg" alt="task-ico"`,
  Idea: `<img class="w-8 h-8 inline my-2" src="./src/icons/idea.svg" alt="idea-ico"/>`,
  Quote: `<img class="w-8 h-8 inline my-2" src="./src/icons/quote.svg" alt="qoute-ico"/>`,
};

export const controlButtons = `
    <button class="w-12 h-12 editNote"><img class="w-8 h-8 inline" src="./src/icons/pen.svg" alt="icon"/></button>
    <button class="w-12 h-12 archiveNote"><img class="w-8 h-8 inline" src="./src/icons/toArchive.svg" alt="icon"/></i></button>
    <button class="w-12 h-12 deleteNote"><img class="w-8 h-8 inline" src="./src/icons/toDelete.svg" alt="icon"/></i></button>`;

export const tableTopButtons = `
<button class="w-12 h-12 changeStateAll"><img class="w-8 h-8 inline" src="./src/icons/archiveAll.svg" alt="icon"/></button>
<button class="w-12 h-12 deleteAll"><img class="w-8 h-8 inline" src="./src/icons/deleteAll.svg" alt="icon"/></button>
`;

export const maxContentLength = 35;

export const dateFormats =
  /(((0[1-9]|[12][0-9]|3[01])([\/.-])(0[13578]|10|12)([\/.-])(\d{4}))|((0[1-9]|[12][0-9]|30)([\/.-])(0[469]|11)([\/.-])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([\/.-])(02)([\/.-])(\d{4}))|((29)([\/.-])(02)([\/.-])([02468][048]00))|((29)(\/)(02)(\/)([13579][26]00))|((29)([\/.-])(02)([\/.-])([0-9][0-9]0[48]))|((29)([\/.-])(02)([\/.-])([0-9][0-9][2468][048]))|((29)([\/.-])(02)([\/.-])([0-9][0-9][13579][26])))/g;
// не розуміє дні й місяці з одним числом (12.2.2004 - не знайде, 12.02.2004 - знайде)

// /(0?[1-9]|[12][0-9]|3[01])([\/.-])(0?[1-9]|1[012])([\/.-])\d{4}/g -- Працює,
// але пропускає 31 лютого (і тп.) і не враховує високосний рік
