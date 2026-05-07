const json = `{
  "student": {
    "name": "Mykyta",
    "age": 20,
    "subjects": ["Math", "Programming", "Physics"],
    "scores": {
      "Math": 95,
      "Programming": 88,
      "Physics": 90
    }
  }
}
`;

const data = JSON.parse(json);

const printJSON = (obj, rep = 0) => {
  const separator = "-".repeat(rep);

  if (Array.isArray(obj)) {
    console.log(separator + "Масив");

    for (let i = 0; i < obj.length; i++) {
      console.log(separator + ` Елемент№${i}`);
      printJSON(obj[i], rep + 6);
    }
  } else if (typeof obj === "object" && obj != null) {
    console.log(separator + "Об'єкт");

    for (const k in obj) {
      const value = obj[k];

      console.log(separator + k);
      printJSON(value, rep + 6);
    }
  } else {
    console.log(separator + ` ${obj}`);
  }
};

printJSON(data);
