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
  //   current_store: "4",
  //   is_llm: true,
  //   llm: "Here are 5 bundles that you can create using the Pork Loin Roast and other available ingredients: **Bundle 1: Classic Comfort** * 1 x Pork Loin Roast (1 lb) * 1 x Bag of Mashed Potato Mix (serves 4) * 1 x Gravy Mix (serves 4) * 1 x Fresh Thyme (1 bunch) This bundle is perfect for a hearty, comforting meal. The Pork Loin Roast is the star of the show, paired with creamy mashed potatoes and a rich, savory gravy. The fresh thyme adds a bright, herbaceous note to the dish. **Bundle 2: Italian-Inspired** * 1 x Pork Loin Roast (1 lb) * 1 x Jar of Marinara Sauce (16 oz) * 1 x Bag of Italian-Style Bread Crumbs (1 lb) * 1 x Fresh Basil (1 bunch) This bundle takes you on a taste tour of Italy. The Pork Loin Roast is marinated in a tangy marinara sauce and topped with crispy Italian-style bread crumbs. The fresh basil adds a pop of color and a burst of fresh flavor. **Bundle 3: Roasted Delight** * 1 x Pork Loin Roast (1 lb) * 1 x Bag of Roasted Vegetable Mix (serves 4) * 1 x Fresh Rosemary (1 bunch) * 1 x Olive Oil (1 bottle) This bundle is perfect for a special occasion or a dinner party. The Pork Loin Roast is roasted to perfection and served with a colorful medley of roasted vegetables. The fresh rosemary adds a fragrant, herbaceous note to the dish. **Bundle 4: BBQ Bonanza** * 1 x Pork Loin Roast (1 lb) * 1 x Bottle of BBQ Sauce (16 oz) * 1 x Bag of Coleslaw Mix (serves 4) * 1 x Fresh Cilantro (1 bunch) This bundle is perfect for a summer BBQ or a casual dinner. The Pork Loin Roast is slathered in a sweet and tangy BBQ sauce and served with a refreshing coleslaw. The fresh cilantro adds a bright, citrusy note to the dish. **Bundle 5: French-Inspired** * 1 x Pork Loin Roast (1 lb) * 1 x Bag of Mushroom and Onion Mix (serves 4) * 1 x Bag of French-Style Bread (1 lb) * 1 x Fresh Parsley (1 bunch) This bundle takes you on a culinary journey to France. The Pork Loin Roast is paired with a rich, earthy mushroom and onion mix and served with a crusty French-style bread. The fresh parsley adds a bright, herbaceous note to the dish. Each bundle is carefully crafted to bring you the best flavors and convenience. Whether you're in the mood for a classic comfort meal or a French-inspired dinner, we've got you covered!",
  //   llm_bundle: "**Pork Loin Roast** 1. **Carnitas Tacos**: A Mexican dish where the pork loin roast is slow-cooked in lard or oil until tender, then shredded and served in tacos with your choice of toppings. 2. **Pulled Pork Sandwiches**: Similar to carnitas, but served on a bun with barbecue sauce and coleslaw. 3. **Pork Loin Roast with Apple Cider Glaze**: A sweet and savory glaze made with apple cider, Dijon mustard, and herbs is brushed over the pork loin roast during the last 20 minutes of cooking. 4. **Pork Loin Roast with Mushroom Gravy**: Sautéed mushrooms and onions are added to the pan juices to create a rich and savory gravy to serve over the pork loin roast. 5. **Pork Loin Roast with Roasted Vegetables**: The pork loin roast is roasted in the oven with a variety of vegetables such as carrots, Brussels sprouts, and red potatoes. 6. **Pork Loin Roast Quesadillas**: Shredded pork loin roast is used in place of traditional chicken or beef in quesadillas, served with salsa and sour cream. 7. **Pork Loin Roast with BBQ Sauce**: The pork loin roast is slow-cooked in a sweet and tangy BBQ sauce until tender and caramelized. 8. **Pork Loin Roast with Pineapple Salsa**: A fresh and fruity salsa made with pineapple, red onion, jalapeño, cilantro, and lime juice is served over the pork loin roast. 9. **Pork Loin Roast with Polenta**: The pork loin roast is served with a creamy polenta and a side of sautéed spinach. 10. **Pork Loin Roast with Korean-Style BBQ**: The pork loin roast is marinated in a sweet and spicy Korean-inspired BBQ sauce and grilled until caramelized. These are just a few ideas for repurposed prepared foods items using the pork loin roast as the main ingredient. The possibilities are endless, and the final dish can be tailored to your personal taste preferences and dietary needs.",
  //   is_store: true,
  //   store: {'Store 5': 2},
  //   product_names:['Smoked Haddock Fillet', 'Celery Sticks', 'Pork Loin Roast', 'Dried Rosemary'],
  //   expires_in: [51, 51, 51, 51],
  //   response:[0,0,1,0],
  //   demand: [17,26,12,22],
  //   availability: [18, 28, 21, 25]

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
