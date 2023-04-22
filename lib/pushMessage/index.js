import fetch from "node-fetch";

export const pushMessage = async (title, chapter, date, url) => {
  if (title) {
    try {
      await fetch(`${process.env.LINE_API_PUSH_URL}`, {
        body: JSON.stringify(
          {
            to: process.env.LINE_GROUP_ID,
            messages: [
              {
                "type": "text",
                "text": `Salam sejahtera Botis,\n\nJangan lupa baca ${title}\n${chapter}\n${date}\nlink:${url}`
              }
            ]
          }
        ),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.LINE_ACCESS_TOKEN
        },
        method: "POST",
      });

    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
