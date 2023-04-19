const userModel = require('./model/usermodel');

const controllerMethods = async (req, res) => {

    if (req.url === '/get' && req.method === "GET") {
        const getModel = await userModel.find()
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(getModel))
        res.end();
    }

    if (req.url.match(/\/get\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[2]; //for get id we are using split
            const userOne = await userModel.findById(id);

            if (userOne) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(userOne));
            } else {
                throw new Error("Requested blog does not exist");
            }
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    if (req.url === "/postuser" && req.method === "POST") {
        try {
            // let data='';
            let data = []
            req.on("data", (xd) => {
                // data += xd JSON.parse()
                data.push(xd)
            });

            req.on("end", async () => {
                let postModel = new userModel(data).save();

                // await postModel.save();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(postModel));
            });
        } catch (error) {
            console.log(error);
        }
    }

    if (req.url.match(/\/get\/([0-9]+)/) && req.method === "PATCH") {
        try {
            const id = req.url.split("/")[2];
            // let data = ""; JSON.parse()
            let data=[]

            req.on("data", (xd) => {
                // data += xd.toString();
                data.push(xd)
            });

            req.on("end", async () => {
                let updatedUser = await userModel.findByIdAndUpdate(id,data, {
                    new: true,
                });

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(updatedUser));
            });
        } catch (error) {
            console.log(error);
        }
    }

    if (req.url.match(/\/get\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[2];

            await userModel.findByIdAndDelete(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User deleted successfully" }));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
}

module.exports = controllerMethods;