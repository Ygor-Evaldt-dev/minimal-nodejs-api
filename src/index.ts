import { HttpServer } from "@/server";
import { LocalDatabaseOrm } from "@/database/local-database-orm";
import { TaskModule } from "@/task/task.module";
import { TaskRoutes } from "@/routes/task-route";

function main() {
    const localDatabaseOrm = new LocalDatabaseOrm();
    const taskModule = new TaskModule(localDatabaseOrm);

    new TaskRoutes("/task", taskModule.taskController);

    new HttpServer().start();
}

main();