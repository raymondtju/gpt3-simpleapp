const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  let prompt =
    "Fix the Grammar of the following sentence: " +
    "\n\n'''" +
    req.body.name +
    "\n\n'''" +
    "After fixing : ";
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    temperature: 0.4,
    top_p: 1,
    max_tokens: 150,
    best_of: 1,
  });
  console.log(completion.data.choices);
  res.status(200).json({ data: `${completion.data.choices[0].text}` });
}
