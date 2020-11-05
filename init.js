import app from "./app";
const POST = process.env.SERVER_PORT || 4001;

app.listen(POST, function () {
  console.log("Server is listening on " + POST);
});
