import express from "express";
import cors from "cors";
import { registerHandler } from "./routes/auth/register";
import { loginHandler } from "./routes/auth/login";
import { indexHandler } from "./routes/get";
import authorization from "./middleware/authorization";
// import { userHandler } from "./routes/auth/user";
import { registrationHandler } from "./routes/admin/registration";
import { meHandler } from "./routes/admin/me";
import { verifyHandler } from "./routes/admin/verify_account";
import { deleteAccountHandler } from "./routes/admin/delete_account";
import { studentsHandler } from "./routes/admin/student/students";
import { getMenuHandler } from "./routes/admin/get_menu";
import { getRoomListHandler } from "./routes/admin/get_room_list";
import { seachHandler } from "./routes/admin/search";
import { studentsHealthHandler } from "./routes/admin/student/students_health";
import { studentsConfigHandler } from "./routes/app/config";
import { studentsIdHandler } from "./routes/admin/student/student_id";
import { studentsEditInfoHandler } from "./routes/admin/student/edit/info";
import { studentsEditRegistrationHandler } from "./routes/admin/student/edit/registration";
import { studentsEditBehaviourHandler } from "./routes/admin/student/edit/behaviour";
import { studentsEditAcademicTranscriptHandler } from "./routes/admin/student/edit/academic/transcript";
import { studentsEditAcademicEvaluateHandler } from "./routes/admin/student/edit/academic/eveluate";
import { studentsEditAcademicHouseHandler } from "./routes/admin/student/edit/academic/house";
import { studentsEditAcademicNatureHandler } from "./routes/admin/student/edit/academic/nature";
import { studentsAddInfoHandler } from "./routes/admin/student/add";
import { getDistrict } from "./routes/app/get_district";
import { getSubDistrict } from "./routes/app/get_sub_district";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const main = () => {
  initHandler();
  start();
};

const initHandler = () => {
  app.get("/", indexHandler);
  app.get("/api/auth/me", authorization, meHandler);
  app.post("/api/auth/login", loginHandler);
  app.post("/api/auth/register", registerHandler);

  app.get("/api/admin/registration", authorization, registrationHandler);
  app.post("/api/admin/account/verify", authorization, verifyHandler);
  app.post("/api/admin/account/delete", authorization, deleteAccountHandler);

  app.get("/api/students", studentsHandler);
  app.get("/api/students/:academic_year/:id", studentsIdHandler);
  app.post("/api/search", seachHandler);
  app.post("/api/students/health", studentsHealthHandler);
  app.get("/api/rooms", studentsHandler);
  app.get("/api/menu", getMenuHandler);
  app.get("/api/roomlist/:year", getRoomListHandler);

  app.get("/api/app/config", studentsConfigHandler);
  app.get("/api/app/district", getDistrict);
  app.get("/api/app/sub_district", getSubDistrict);


  app.post("/api/students/edit/info", studentsEditInfoHandler);
  app.post("/api/students/add", studentsAddInfoHandler);
  app.post("/api/students/edit/registration", studentsEditRegistrationHandler);
  app.post("/api/students/edit/behaviour", studentsEditBehaviourHandler);
  app.post(
    "/api/students/edit/academic/transcript",
    studentsEditAcademicTranscriptHandler
  );
  app.post(
    "/api/students/edit/academic/evaluate",
    studentsEditAcademicEvaluateHandler
  );
  app.post(
    "/api/students/edit/academic/house",
    studentsEditAcademicHouseHandler
  );
  app.post(
    "/api/students/edit/academic/nature",
    studentsEditAcademicNatureHandler
  );
};

const start = () => {
  app.listen(port, () => console.log("Listening on port : " + port));
};

main();
