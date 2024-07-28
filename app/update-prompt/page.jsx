"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import Loading from "@app/profile/loading";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPromptDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error(`Error fetching prompt details: ${response.statusText}`);
        }
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      setIsSubmitting(false);
      return alert("Missing PromptId!");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        router.push("/");
      } else {
        throw new Error(`Error updating prompt: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
      alert(`Failed to update prompt: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
