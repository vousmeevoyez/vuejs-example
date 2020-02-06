import { HTTP } from "@/utility/";

async function fetchAllPost() {
  return HTTP.get(`posts`)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return e;
    });
}
export default fetchAllPost;
