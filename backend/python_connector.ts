import { PythonShell } from "python-shell";
import { databaseConnector } from "./database_connector";
import fs from "fs";

/**
 * Object that is used to run python scripts
 */
class PythonConnector {
  /**
   * Run python script that generates recommendations for a user.
   * @param userId The ID of the user whose recommendations should be returned
   * Returns a sorted array of experienceIds to recommend to a user
   */
  getRecommendations = async (userId: string): Promise<Number[]> => {
    let pythonPath: string = "";
    try {
      if (fs.existsSync("../python/venv/scripts")) {
        pythonPath = "../python/venv/scripts/python.exe";
      } else {
        if (fs.existsSync("../python/venv/bin")) {
          pythonPath = "../python/venv/bin/python";
        }
      }
    } catch (error) {
      console.log(error);
    }
    const experiences = await databaseConnector.getExperiences();
    const views = await databaseConnector.getViews();
    const data = { experiences: experiences, userId: userId, views: views };

    const scriptPath = "../python/scripts/content-based-filter.py";
    let pyshell = new PythonShell(scriptPath, {
      mode: "json",
    });

    if (pythonPath != "") {
      pyshell = new PythonShell(scriptPath, {
        mode: "json",
        pythonPath: pythonPath,
      });
    }
    let recommendations: Number[] = [];
    return new Promise((resolve, reject) => {
      pyshell.send(data);
      pyshell.on("message", function (message) {
        // console.log(message);
        recommendations.push(message);
      });
      pyshell.end(function (err, code, signal) {
        if (err) {
          reject(err);
        } else {
          console.log(
            "Python script finished with exit code and signal: (" +
              code +
              ", " +
              signal +
              ")"
          );
          resolve(recommendations);
        }
      });
    });
  };
}

export const pythonConnector = new PythonConnector();
