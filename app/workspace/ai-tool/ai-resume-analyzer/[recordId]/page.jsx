'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AiResumeAnalyzer() {
    const { recordId } = useParams();
    const [report, setReport] = useState(null);
    const [pdfUrl, setPdfUrl] = useState("");

    useEffect(() => {
        if (recordId) getResumeReport();
    }, [recordId]);

    async function getResumeReport() {
        try {
            const result = await axios.get(`/api/history?recordId=${recordId}`);
            console.log(result.data);
            setPdfUrl(result.data.metadata);
            setReport(result.data.content);
        } catch (e) {
            console.error(e);
        }
    }

    const Card = ({ title, children, gradient = "from-blue-500 to-blue-700" }) => (
        <div className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all p-5 text-white bg-gradient-to-r ${gradient}`}>
            <h2 className="text-lg font-bold mb-3">{title}</h2>
            <div className="text-sm">{children}</div>
        </div>
    );

    return (
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-6 p-6 bg-gray-100 min-h-screen">
            {/* Left side - Analysis Report */}
            <div className="col-span-2 space-y-6">
                {!report ? (
                    <p className="text-gray-500">Loading report...</p>
                ) : (
                    <>
                        {/* Overall Summary */}
                        <Card title="Overall Analysis" gradient="from-cyan-500 to-blue-500">
                            <p><strong>Score:</strong> {report.overall_score}</p>
                            <p><strong>Feedback:</strong> {report.overall_feedback}</p>
                            <p className="italic mt-2">{report.summary_comment}</p>
                        </Card>

                        {/* Sections */}
                        <Card title="Sections" gradient="from-indigo-500 to-purple-500">
                            <div className="space-y-4">
                                {Object.entries(report.sections || {}).map(([key, value]) => (
                                    <div key={key} className="bg-white/20 p-3 rounded-lg shadow-sm">
                                        <h3 className="font-semibold capitalize">{key.replace("_", " ")}</h3>
                                        <p><strong>Score:</strong> {value.score}</p>
                                        <p>{value.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Tips for Improvement */}
                        <Card title="Tips for Improvement" gradient="from-rose-400 to-pink-500">
                            <ul className="list-disc ml-6 space-y-1">
                                {report.tips_for_improvement?.map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                ))}
                            </ul>
                        </Card>

                        {/* What's Good */}
                        <Card title="What’s Good" gradient="from-emerald-400 to-green-500">
                            <ul className="list-disc ml-6 space-y-1">
                                {report.whats_good?.map((good, idx) => (
                                    <li key={idx}>{good}</li>
                                ))}
                            </ul>
                        </Card>

                        {/* Needs Improvement */}
                        <Card title="Needs Improvement" gradient="from-amber-400 to-orange-500">
                            <ul className="list-disc ml-6 space-y-1">
                                {report.needs_improvement?.map((bad, idx) => (
                                    <li key={idx}>{bad}</li>
                                ))}
                            </ul>
                        </Card>

                    </>
                )}
            </div>

            {/* Right side - PDF Viewer */}
            <div className="col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden">
                {pdfUrl ? (
                    <iframe
                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-[90vh]"
                    />
                ) : (
                    <p className="p-6 text-gray-500">Loading PDF...</p>
                )}
            </div>
        </div>
    )
}

export default AiResumeAnalyzer
