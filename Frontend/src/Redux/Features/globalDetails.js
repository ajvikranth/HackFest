// import axios from "axios";

// const postgresHost = "172.18.0.6";
// const redisHost = "172.18.0.5";

const postgresHost = "localhost";
const redisHost = "localhost";
const initialState = {
  currentActiveIndex: 1,
  question: 0,
  timerRunning: true,
  expiration: 30,
  initialTimer: 30 * 60,
  postgresBackend: `http://${postgresHost}:5555/`,
  redisBackend: `http://${redisHost}:5000/`,

  // postgresBackend: `http://172.18.0.6:5555/`,
  // redisBackend: `http://172.18.0.5:5000/`,
  code: [],
  role: "python",
  results: {},
  // results: {
  //   message: "success",
  //   current_store: "",
  //   is_llm: true,
  //   llm: " ",
  //   llm_bundle: "",
  //   is_store: true,
  //   store: {'Store 1': 10, 'Store 2': 5},
  //   product_names:['apple', 'bannana'],
  //   expires_in: [20, 10],
  //   response:[0,1],
  //   demand: [20,30],
  //   availability: [20,30]

  // },
  challenges: {
    python: {
      easyLevel: {
        output: "",
        question:
          "Wrsite a Python function to clean and preprocess a dataset using pandas. Handle missing values and detect outliers.",
        hint: "import pandas as pd\n\ndef preprocess_dataset(df):\n    # Handle missing values\n    # Handle outliers\n    return cleaned_df",
      },
      intermediateLevel: {
        output: "",
        question:
          "Implement a linear regression model using TensorFlow or PyTorch. Evaluate model performance using metrics like RMSE. Implement feature scaling.",
        hint: "import tensorflow as tf\n# Define model\n# Train model\n# Evaluate model",
      },
      advancedLevel: {
        output: "",
        question:
          "Create a data pipeline using Apache Spark. Optimize for distributed computing with techniques like partitioning and caching.",
        hint: "from pyspark.sql import SparkSession\n# Initialize Spark session\n# Define pipeline stages\n# Execute and optimize pipeline",
      },
    },

    java: {
      easyLevel: {
        question:
          "Write a Java program to sum elements in an array. Handle different data types using generics.",
        hint: "public class ArraySum {\n    public static <T extends Number> double sum(T[] array) {\n        // Sum logic\n    }\n}",
      },
      intermediateLevel: {
        question:
          "Implement a RESTful API using Spring Boot. Add authentication (e.g., JWT) and authorization.",
        hint: '@RestController\n@RequestMapping("/api")\npublic class ApiController {\n    // API methods\n}',
      },
      advancedLevel: {
        question:
          "Develop a multithreaded Java application for data processing. Implement synchronization (e.g., `synchronized` blocks, `Locks`).",
        hint: "public class DataProcessor implements Runnable {\n    // Threaded processing logic\n}",
      },
    },
    dotnet: {
      easyLevel: {
        question:
          "Write a C# program to reverse a string. Implement without using the built-in reverse function.",
        hint: "public string ReverseString(string input) {\n    // Reverse logic\n}",
      },
      intermediateLevel: {
        question:
          "Create an ASP.NET MVC web application for product database management. Implement CRUD operations and data validation.",
        hint: "public class ProductsController : Controller {\n    // CRUD actions\n}",
      },
      advancedLevel: {
        question:
          "Build .NET Core microservices with Docker. Implement service discovery (e.g., Consul, Eureka) and load balancing.",
        hint: "// Define microservices\n// Docker configuration\n// Service discovery setup",
      },
    },
    nodejs: {
      easyLevel: {
        question:
          "Create a simple Node.js server responding with 'Hello, World!'. Implement error handling for HTTP status codes.",
        hint: 'const express = require("express");\nconst app = express();\n// Server setup',
      },
      intermediateLevel: {
        question:
          "Develop a RESTful API using Node.js and Express. Incorporate authentication middleware and logging.",
        hint: 'const express = require("express");\nconst router = express.Router();\n// API routes',
      },
      advancedLevel: {
        question:
          "Build a real-time chat application using Node.js, Socket.io, and Redis. Features: private messaging, message history.",
        hint: 'const io = require("socket.io")(server);\n// Chat application logic',
      },
    },
  },
};

const HANDLE_UPDATE_NEXT_QUESTION = "HANDLE_UPDATE_NEXT_QUESTION";
const HANDLE_UPDATE_PREV_QUESTION = "HANDLE_UPDATE_PREV_QUESTION";
const HANDLE_UPDATE_CODE = "HANDLE_UPDATE_CODE";
const HANDLE_ROLE_UPDATE = "HANDLE_ROLE_UPDATE";
const HANDLE_OUTPUT_UPDATE = "HANDLE_OUTPUT_UPDATE";
const HANDLE_RESULTS_UPDATE = "HANDLE_RESULTS_UPDATE";

export const handle_code_update = (level, code, role) => ({
  type: HANDLE_UPDATE_CODE,
  payload: { level, code, role },
});

export const handle_role_update = (role) => ({
  type: HANDLE_ROLE_UPDATE,
  payload: { role },
});

export const handleUpdateNextQuestion = (question) => ({
  type: HANDLE_UPDATE_NEXT_QUESTION,
  payload: { question },
});

export const handleUpdatePrevQuestion = (question) => ({
  type: HANDLE_UPDATE_PREV_QUESTION,
  payload: { question },
});
export const handleOutputUpdate = (currentLevel, output, currentRole) => ({
  type: HANDLE_OUTPUT_UPDATE,
  payload: { currentLevel, output, currentRole },
});
export const handleResultsUpdate = (data) => ({
  type: HANDLE_RESULTS_UPDATE,
  payload: { data },
});

const globalOptionsReducer = (state = initialState, action) => {
  let question_number = null;
  console.log(action.payload);
  switch (action.type) {
    case HANDLE_UPDATE_NEXT_QUESTION:
      if (action.payload.question >= 0 && action.payload.question < 2) {
        question_number = action.payload.question + 1;
      } else {
        question_number = action.payload.question;
      }

      return {
        ...state,
        question: question_number,
      };

    case HANDLE_UPDATE_PREV_QUESTION:
      if (action.payload.question > 0 && action.payload.question <= 2) {
        question_number = action.payload.question - 1;
      } else {
        question_number = action.payload.question;
      }

      return {
        ...state,
        question: question_number,
      };

    case HANDLE_UPDATE_CODE:
      const { level, code, role } = action.payload;
      console.log("code in handle_update_code", code);
      console.log(role);
      console.log(state.challenges[[role]]);

      return {
        ...state,
        challenges: {
          ...state.challenges,
          [role]: {
            ...state.challenges[role],
            [level]: {
              ...state.challenges[role][level],
              hint: code,
            },
          },
        },
      };
    case HANDLE_OUTPUT_UPDATE:
      const { currentLevel, output, currentRole } = action.payload;

      return {
        ...state,
        challenges: {
          ...state.challenges,
          [currentRole]: {
            ...state.challenges[currentRole],
            [currentLevel]: {
              ...state.challenges[currentRole][currentLevel],
              output: output,
            },
          },
        },
      };

    case HANDLE_ROLE_UPDATE:
      return { ...state, role: action.payload.role };
      
    case HANDLE_RESULTS_UPDATE:
      return { ...state, results: action.payload.data };
    default:
      return state;
  }
};

export default globalOptionsReducer;
