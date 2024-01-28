import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";

/**
 * Import your Room files
 */
import { playground } from "@colyseus/playground";
import { MyRoom } from "./rooms/MyRoom.js";

export default config({

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('GameRoom', MyRoom);

    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         * Read more: https://expressjs.com/en/starter/basic-routing.html
         */
        app.get("/hello_world", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        app.get("/matchmake/joinOrCreate/GameRoom", (req, res) => {
            // Your logic for handling the GET request goes here
            console.log("Game Room request")
            res.status(200).send("Handling GET request for /matchmake/joinOrCreate/GameRoom");
        });

        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        if (process.env.NODE_ENV !== "production") {
            // app.use("/", playground);
        }

        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
