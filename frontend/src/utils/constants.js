export const categories = {
  Thoughts: '<i class="bi bi-patch-question"></i>',
  Task: '<i class="bi bi-briefcase"></i>',
  Idea: '<i class="bi bi-lightbulb"></i>',
  Quote: '<i class="bi bi-chat-right-quote"></i>',
};

export const controlIcons = `
    <button class="btn btn-outline-primary brush"><i class=\"bi bi-brush\"></i></button>
    <button class="btn btn-outline-primary archive"><i class=\"bi bi-archive\"></i></button>
    <button class="btn btn-outline-primary bucket"><i class=\"bi bi-bucket\"></i></button>`;

export const maxContentLength = 35;

export const dateFormats =
  /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/g;
