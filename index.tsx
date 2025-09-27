/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { GoogleGenAI, Type } from "@google/genai";

type AppState = "initial" | "interview" | "results";
type Language = "ar" | "en";

const translations = {
  // Header
  appTitle: { ar: "الوكيل المتخصص", en: "The Specialist Agent" },
  appSubtitle: {
    ar: "تقييم مدعوم بالذكاء الاصطناعي لوظائف التسويق الرقمي",
    en: "AI-Powered Assessment for Digital Marketing Roles",
  },
  // Initial Form
  step1Title: {
    ar: "الخطوة 1: تقديم تفاصيل المرشح",
    en: "Step 1: Provide Candidate Details",
  },
  jobTitleLabel: { ar: "المسمى الوظيفي", en: "Job Title" },
  jobTitlePlaceholder: {
    ar: "مثال: أخصائي سيو، مدير وسائط اجتماعية",
    en: "e.g., SEO Specialist, Social Media Manager",
  },
  cvLabel: { ar: "سيرة المرشح الذاتية (PDF)", en: "Candidate's CV (PDF)" },
  uploadButton: { ar: "انقر لتحميل ملف PDF", en: "Click to upload a PDF file" },
  generateInterviewButton: { ar: "إنشاء مقابلة", en: "Generate Interview" },
  // Interview Form
  step2Title: {
    ar: "الخطوة 2: مقابلة المرشح",
    en: "Step 2: Interview the Candidate",
  },
  generatedFor: { ar: "تم إنشاؤها لـ:", en: "Generated for:" },
  answerPlaceholder: { ar: "إجابة المرشح...", en: "Candidate's answer..." },
  answerLabel: { ar: "إجابة السؤال", en: "Answer for question" },
  submitAnswersButton: {
    ar: "إرسال الإجابات للتقييم",
    en: "Submit Answers for Evaluation",
  },
  // Results
  step3Title: { ar: "الخطوة 3: نتائج التقييم", en: "Step 3: Evaluation Results" },
  aiJustification: { ar: "مبررات الذكاء الاصطناعي:", en: "AI Justification:" },
  aiDetectionNoteTitle: { ar: "ملاحظة:", en: "Note:" },
  aiDetectionNoteBody: {
    ar: "تم تقييم هذه الإجابات بواسطة الذكاء الاصطناعي. يرجى العلم أنه من الممكن أن تكون الإجابات نفسها قد تم إنشاؤها بواسطة الذكاء الاصطناعي.",
    en: "These answers were evaluated by an AI. Please be aware that the answers themselves could have been AI-generated.",
  },
  newAssessmentButton: { ar: "بدء تقييم جديد", en: "Start a New Assessment" },
  // Loading Messages
  loadingQuestions: {
    ar: "جاري تحليل السيرة الذاتية وإنشاء الأسئلة...",
    en: "Analyzing CV and generating questions...",
  },
  loadingEvaluation: {
    ar: "جاري تقييم الإجابات وحساب النتيجة...",
    en: "Evaluating answers and calculating score...",
  },
  // Error Messages
  errorInvalidPDF: {
    ar: "الرجاء تحميل ملف PDF صالح.",
    en: "Please upload a valid PDF file.",
  },
  errorMissingInfo: {
    ar: "الرجاء تحميل السيرة الذاتية وإدخال المسمى الوظيفي.",
    en: "Please upload the CV and enter the job title.",
  },
  errorNoQuestions: {
    ar: "لم يقم الذكاء الاصطناعي بإرجاع أي أسئلة.",
    en: "The AI did not return any questions.",
  },
  errorGenerateFailed: {
    ar: "فشل في إنشاء الأسئلة:",
    en: "Failed to generate questions:",
  },
  errorAnswerAll: {
    ar: "يرجى الإجابة على جميع الأسئلة قبل الإرسال.",
    en: "Please answer all questions before submitting.",
  },
  errorEvaluateFailed: {
    ar: "فشل في تقييم الإجابات:",
    en: "Failed to evaluate answers:",
  },
  // Prompts
  promptGenerateQuestions: {
    ar: `بناءً على السيرة الذاتية المرفقة لوظيفة "{jobTitle}"، قم بإنشاء 15 سؤال مقابلة على المستوى المهني لتقييم مدى ملاءمة المرشح. يجب أن تغطي الأسئلة مهاراته وخبراته وقدراته على حل المشكلات ذات الصلة بهذا الدور.`,
    en: `Based on the attached CV for the role of "{jobTitle}", generate 15 professional-level interview questions to assess the candidate's suitability. The questions should cover their skills, experience, and problem-solving abilities relevant to this role.`,
  },
  promptEvaluateAnswers: {
    ar: `
      المسمى الوظيفي: {jobTitle}
      أسئلة المقابلة وإجابات المرشح:
      {questionsAndAnswers}
      المهمة: يرجى تقييم إجابات المرشح. قم بتقييم المقابلة بأكملها من 100 نقطة بناءً على الجودة والملاءمة والخبرة التي تظهر في إجاباتهم. قدم درجة إجمالية ومبررًا موجزًا لتقييمك باللغة العربية.`,
    en: `
      Job Title: {jobTitle}
      Interview Questions and Candidate's Answers:
      {questionsAndAnswers}
      Task: Please evaluate the candidate's answers. Score the entire interview out of 100 points based on the quality, relevance, and expertise demonstrated in their responses. Provide a total score and a brief justification for your assessment in English.`,
  },
  promptQuestionAnswerFormat: {
    ar: `السؤال {index}: {question}\nالإجابة: {answer}\n`,
    en: `Question {index}: {question}\nAnswer: {answer}\n`,
  },
};

const App = () => {
  const [appState, setAppState] = useState<AppState>("initial");
  const [language, setLanguage] = useState<Language>("ar");
  const [jobTitle, setJobTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{
    score: number;
    justification: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [scoreAngle, setScoreAngle] = useState(0);

  const t = (key: keyof typeof translations) => translations[key][language];

  const ai = useMemo(
    () => new GoogleGenAI({ apiKey: process.env.API_KEY as string }),
    []
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    if (appState === "results" && result) {
      const targetAngle = (result.score / 100) * 360;
      setTimeout(() => setScoreAngle(targetAngle), 100);
    }
  }, [appState, result]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setPdfFile(file);
        setError(null);
      } else {
        setError(t("errorInvalidPDF"));
        setPdfFile(null);
      }
    }
  };

  const handleGenerateInterview = async () => {
    if (!pdfFile || !jobTitle.trim()) {
      setError(t("errorMissingInfo"));
      return;
    }

    setLoadingMessage(t("loadingQuestions"));
    setError(null);
    try {
      const pdfBase64 = await fileToBase64(pdfFile);
      const pdfPart = {
        inlineData: { mimeType: "application/pdf", data: pdfBase64 },
      };
      const textPart = {
        text: t("promptGenerateQuestions").replace("{jobTitle}", jobTitle),
      };

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [pdfPart, textPart] },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
          },
        },
      });

      const parsedResponse = JSON.parse(response.text);
      if (parsedResponse.questions && parsedResponse.questions.length > 0) {
        setQuestions(parsedResponse.questions);
        setAnswers(new Array(parsedResponse.questions.length).fill(""));
        setAppState("interview");
      } else {
        throw new Error(t("errorNoQuestions"));
      }
    } catch (e: any) {
      console.error(e);
      setError(`${t("errorGenerateFailed")} ${e.message}`);
    } finally {
      setLoadingMessage(null);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmitAnswers = async () => {
    if (answers.some((answer) => answer.trim() === "")) {
      setError(t("errorAnswerAll"));
      return;
    }
    setLoadingMessage(t("loadingEvaluation"));
    setError(null);
    try {
      const questionsAndAnswers = questions
        .map((q, i) =>
          t("promptQuestionAnswerFormat")
            .replace("{index}", String(i + 1))
            .replace("{question}", q)
            .replace("{answer}", answers[i])
        )
        .join("\n");

      const prompt = t("promptEvaluateAnswers")
        .replace("{jobTitle}", jobTitle)
        .replace("{questionsAndAnswers}", questionsAndAnswers);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              justification: { type: Type.STRING },
            },
          },
        },
      });

      const parsedResult = JSON.parse(response.text);
      setResult(parsedResult);
      setAppState("results");
    } catch (e: any) {
      console.error(e);
      setError(`${t("errorEvaluateFailed")} ${e.message}`);
    } finally {
      setLoadingMessage(null);
    }
  };

  const handleReset = () => {
    setAppState("initial");
    setJobTitle("");
    setPdfFile(null);
    setQuestions([]);
    setAnswers([]);
    setResult(null);
    setError(null);
    setScoreAngle(0);
  };

  const isInitialFormValid = pdfFile && jobTitle.trim() !== "";
  const areAnswersComplete = answers.every((answer) => answer.trim() !== "");

  const renderInitialForm = () => (
    <div className="card">
      <div className="lang-switcher">
        <button
          className={`lang-btn ${language === "en" ? "active" : ""}`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={`lang-btn ${language === "ar" ? "active" : ""}`}
          onClick={() => setLanguage("ar")}
        >
          العربية
        </button>
      </div>
      <h2>{t("step1Title")}</h2>
      <div className="form-group">
        <label htmlFor="job-title">{t("jobTitleLabel")}</label>
        <input
          id="job-title"
          type="text"
          className="input"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder={t("jobTitlePlaceholder")}
        />
      </div>
      <div className="form-group">
        <label>{t("cvLabel")}</label>
        <div className="file-input-wrapper">
          <label htmlFor="file-upload" className="file-input-label">
            {t("uploadButton")}
          </label>
          <input
            id="file-upload"
            type="file"
            className="file-input"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        {pdfFile && <p className="file-name">{pdfFile.name}</p>}
      </div>
      <button
        className="btn"
        onClick={handleGenerateInterview}
        disabled={!isInitialFormValid}
        aria-disabled={!isInitialFormValid}
      >
        {t("generateInterviewButton")}
      </button>
    </div>
  );

  const renderInterview = () => (
    <div className="card">
      <h2>{t("step2Title")}</h2>
      <p
        style={{
          marginBottom: "1.5rem",
          color: "var(--light-text-color)",
        }}
      >
        {t("generatedFor")} <strong>{jobTitle}</strong>
      </p>
      {questions.map((q, i) => (
        <div key={i} className="question-item">
          <p>
            {i + 1}. {q}
          </p>
          <textarea
            className="textarea"
            value={answers[i]}
            onChange={(e) => handleAnswerChange(i, e.target.value)}
            placeholder={t("answerPlaceholder")}
            aria-label={`${t("answerLabel")} ${i + 1}`}
          />
        </div>
      ))}
      <button
        className="btn"
        onClick={handleSubmitAnswers}
        disabled={!areAnswersComplete}
        aria-disabled={!areAnswersComplete}
      >
        {t("submitAnswersButton")}
      </button>
    </div>
  );

  const renderResults = () => (
    <div className="card">
      <h2>{t("step3Title")}</h2>
      {result && (
        <>
          <div className="result-score">
            <div
              className="result-score-display"
              style={
                { "--score-angle": `${scoreAngle}deg` } as React.CSSProperties
              }
            >
              <span className="score">{result.score}</span>
              <span className="total">/ 100</span>
            </div>
          </div>
          <div className="result-justification">
            <h3>{t("aiJustification")}</h3>
            <p>{result.justification}</p>
          </div>
          <div className="ai-detection-note">
            <p>
              <strong>{t("aiDetectionNoteTitle")}</strong>{" "}
              {t("aiDetectionNoteBody")}
            </p>
          </div>
        </>
      )}
      <button
        className="btn"
        onClick={handleReset}
        style={{ marginTop: "2rem" }}
      >
        {t("newAssessmentButton")}
      </button>
    </div>
  );

  return (
    <main className="container">
      {loadingMessage && (
        <div className="loader-overlay" role="alert" aria-busy="true">
          <div className="spinner"></div>
          <p>{loadingMessage}</p>
        </div>
      )}
      <header>
        <h1>{t("appTitle")}</h1>
        <p>{t("appSubtitle")}</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      {appState === "initial" && renderInitialForm()}
      {appState === "interview" && renderInterview()}
      {appState === "results" && renderResults()}
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
