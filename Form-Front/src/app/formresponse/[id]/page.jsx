"use client";
import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formresponses } from "../../../done/common";
import { StatusCode } from "../../../utils/commonEnum";
import { toast, ToastContainer } from "react-toastify";

export default function FormResponsePage() {
    const { id } = useSearchParams(); // dynamic form_id
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchResponses = async () => {
        const response = await formresponses({ form_id: id })

        if (response.statusCode === StatusCode.success) {
            setResponses(response.data);
            toast.success("Form Response Fetched successfully!");
        }
        else {
            toast.error(response.message || "error");
        }
    };

    useEffect(() => {
        setLoading(false)
        fetchResponses();
    }, [id]);

    if (loading) return <p>Loading..</p>;

    return (
        <>
            <ToastContainer />
            <div className="overflow-x-auto rounded-lg shadow-md">
                {responses.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        🚫 No data found.
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                {responses.length > 0 &&
                                    Object.keys(responses[0]).map((key) => (
                                        <th
                                            key={key}
                                            className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b"
                                        >
                                            {key}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {responses.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    {Object.values(row).map((val, idx) => (
                                        <td
                                            key={idx}
                                            className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap"
                                        >
                                            {val}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
