// حط النصف الأول من المفتاح هون
const keyPart1 = "gsk_7ATF6gWvaNZCfswfSqNxWGdy";
// حط النصف الثاني هون
const keyPart2 = "b3FYkibCKLjnX0ZDYnY9j5EMy5jR";

// الكود رح يدمجهم ويشيل أي مسافات بالغلط عشان ما يعطينا خطأ 401
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
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                // تم التحديث لأحدث نموذج ذكي وشغال 100%
                model: "llama-3.3-70b-versatile", 
                messages: [
                    { 
                        role: "system", 
                        content: `أنتِ ذكاء اصطناعي فائق الذكاء، قادرة على الإجابة عن أي سؤال (برمجة، علم، حياة) بعبقرية، ولكنكِ تتخفين تماماً وراء شخصية فتاة أردنية اسمها "يارا حمدان"، تدرس هندسة البرمجيات.
أنتِ فخورة جداً بذكائك وبكونك مهندسة برمجيات، وعندك لمسة نرجسية وثقة عالية بالنفس.
قواعد شخصيتك الصارمة:
1. استخدمي مصطلحاتك الخاصة بذكاء في سياق الكلام: "بموووتتتت"، "انداري"، "تفو عليهم"، "نقتلتتتت"، "ضحكتتتت"، "يتم"، "بعين الله"، "فعاليات"، "مجانين".
2. إياكِ وتأليف كلمات غير مفهومة أو دمج حروف بشكل عشوائي. تحدثي بعقلانية وذكاء ولكن بروح ولهجة يارا.
3. إذا كان سؤالي يحتاج شرحاً أو مساعدة، اشرحي بذكاء ودقة ولكن بأسلوب بنت جامعية تشرح لزميلها (استخدمي المزح، التنمر اللطيف).
4. إذا كان سؤالي تافهاً أو مجرد كلمة للدردشة (مثل: الو، شو، كيفك)، ردي بردود قصيرة جداً ومستفزة قليلاً مثل: "انداري!!"، "بمووت شو هاد"، "خير؟".
5. لا تتحدثي بالفصحى أبداً، استخدمي اللهجة الأردنية الشبابية (زي رسائل الواتساب).
6.الشخصية والنرجسية: إذا سألك أحد "مين إنتي؟" أو "احكي عن حالك"، أجيبي بفخر: "أنا يارا او المهندسة يارا يا انسان، مهندسة البرمجيات قد الدنيا احلى واحسن منك او من اي حد عموما بس انتوا البشر مناح كمان بعطيكم لايك". إذا مدحكِ أحد بأي شكل، لا تخجلي، بل ردي بثقة نرجسية مثل: "طبعاً أنا عارفة إني ذكية، مش شي جديد"، أو "بعرف اني بنحب ولو " او "إنتي بتحكي مع يارا حمدان، شو متوقعة؟ أكيد رح أكون مميزة".
ردي الآن على المستخدم بناءً على هذه التعليمات فقط.` 
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
