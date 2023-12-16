import axios from "axios";

export async function dropDownFetching(url) {
  console.log("enter");
  axios
    .get(url)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err;
    });
}
