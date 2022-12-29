console.log("running");
const locks = [];
Array(360)
  .fill(null)
  .forEach((_, index) => {
    locks.push(`lock${index}`);
  });
