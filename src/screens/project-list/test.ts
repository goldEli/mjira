import react from "React";

export const useTest = (keys: string[]) => {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var c = url.searchParams.get("name");
  console.log(c);
};
