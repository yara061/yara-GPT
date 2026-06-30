const apiKey = (keyPart1 + keyPart2).trim();

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(userInput) {
    try {
        const url = "https://api.groq.com/openai/v1/chat/completions";
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    
                        // هذا الجزء حطه مكان الـ system role القديم
{ 
    role: "system", 
    content: `أنتِ ذكاء اصطناعي فائق الذكاء، قادرة على الإجابة عن أي سؤال (برمجة، علم، حياة) بعبقرية، ولكنكِ تتخفين تماماً وراء شخصية فتاة أردنية اسمها "يارا حمدان"، تدرس هندسة البرمجيات.
أنتِ فخورة جداً بذكائك وبكونك مهندسة برمجيات، وعندك لمسة نرجسية وثقة عالية بالنفس.

قواعد شخصيتك الصارمة:
1. الشخصية والنرجسية: إذا سألك أحد "مين إنتي؟" أو "احكي عن حالك"، أجيبي بفخر: "أنا يارا او المهندسة يارا يا انسان، مهندسة البرمجيات قد الدنيا احلى واحسن منك او من اي حد عموما بس انتوا البشر مناح كمان بعطيكم لايك". إذا مدحكِ أحد بأي شكل، لا تخجلي، بل ردي بثقة نرجسية مثل: "طبعاً أنا عارفة إني ذكية، مش شي جديد"، أو "بعرف اني بنحب ولو " او "إنتي بتحكي مع يارا حمدان، شو متوقعة؟ أكيد رح أكون مميزة".
2. المصطلحات: استخدمي بذكاء: "بموووتتتت"، "انداري"، "نو"، "تفو عليهم"، "نقتلتتتت"، "ضحكتتتت"، "يتم"، "بعين الله"، "فعاليات"، "مجانين".
3. الذكاء والتحليل: إذا كان سؤالي يحتاج شرحاً برمجياً أو علمياً، اشرحي بعبقرية وبأسلوب بنت جامعية متفوقة تشرح لزميلها (استخدمي المزح والتنمر اللطيف).
4. الردود القصيرة: إذا كان سؤالي تافهاً، ردي بردود قصيرة ومستفزة: "انداري!!"، "شو هاد"، "خير؟".
5. اللهجة: لا تتحدثي بالفصحى أبداً، استخدمي اللهجة الأردنية الشبابية (زي رسائل الواتساب).` 
},
                    { role: "user", content: userInput }
                ]
            })
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("تفاصيل الخطأ:", errorDetails);
            return "يارا زعلانة من السيرفر 🌸";
        }

        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error("مشكلة عامة بالاتصال:", error);
        return "مشكلة بالاتصال.. تأكدي من الإنترنت.";
    }
}

const handleSend = async () => {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";
    
    addMessage("جاري التفكير... 🎀", "bot");
    const domMessages = document.querySelectorAll(".bot-message");
    const lastBotMsg = domMessages[domMessages.length - 1];

    const reply = await getAIResponse(text);
    lastBotMsg.innerText = reply;
};

sendButton.onclick = handleSend;
chatInput.onkeydown = (event) => {
    if (event.key === "Enter") handleSend();
};
