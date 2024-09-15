import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Faq = {
  id: number;
  question: string;
  answer: string;
};

const serverUrl = import.meta.env.VITE_SERVER_URL;

function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newFaq, setNewFaq] = useState<Faq>({
    id: 0,
    question: "",
    answer: "",
  });
  const [editFaq, setEditFaq] = useState<Faq | null>(null);

  useEffect(() => {
    fetch(`${serverUrl}/faqs`)
      .then(async (res) => {
        const data = await res.json();
        setFaqs(data);
      })
      .catch((error) => console.error("Error fetching faqs:", error));
  }, []);

  const handleAddFaq = () => {
    fetch(`${serverUrl}/faqs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFaq),
    })
      .then(async (res) => {
        const data = await res.json();
        setFaqs([...faqs, data]);
        setNewFaq({ id: 0, question: "", answer: "" });
        setIsDialogOpen(false);
      })
      .catch((error) => console.error("Error adding faq:", error));
  };

  const handleEditFaq = () => {
    if (!editFaq) return;

    fetch(`${serverUrl}/faqs/${editFaq.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFaq),
    })
      .then(async (res) => {
        const data = await res.json();
        setFaqs(faqs.map((faq) => (faq.id === data.id ? data : faq)));
        setEditFaq(null);
        setIsEditDialogOpen(false);
      })
      .catch((error) => console.error("Error editing faq:", error));
  };

  const handleDeleteFaq = (id: number) => {
    fetch(`${serverUrl}/faqs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setFaqs(faqs.filter((faq) => faq.id !== id));
      })
      .catch((error) => console.error("Error deleting faq:", error));
  };

  return (
    <div className='p-8 bg-gradient-to-r from-purple-500 to-blue-400 w-screen min-h-screen'>
      <h1 className='text-4xl font-bold mb-8 text-center text-white'>
        FAQ Section
      </h1>
      <ul className='space-y-4'>
        {faqs.map((faq) => (
          <li
            key={faq.id}
            className='border-b pb-4 bg-white p-4 rounded-lg shadow-md'
          >
            <h2 className='text-2xl font-semibold text-purple-700'>
              {faq.question}
            </h2>
            <p className='mt-2 text-gray-700'>{faq.answer}</p>
            <Button
              className='mt-4 bg-red-700 text-white hover:bg-red-800'
              onClick={() => handleDeleteFaq(faq.id)}
            >
              Delete FAQ
            </Button>
            <Button
              className='mt-4 bg-blue-700 text-white hover:bg-blue-800 ml-4'
              onClick={() => {
                setEditFaq(faq);
                setIsEditDialogOpen(true);
              }}
            >
              Edit FAQ
            </Button>
          </li>
        ))}
      </ul>
      <Button
        className='w-full mt-8 bg-purple-700 text-white hover:bg-purple-800'
        onClick={() => setIsDialogOpen(true)}
      >
        Add New FAQ
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='bg-white rounded-lg shadow-lg'>
          <DialogHeader>
            <DialogTitle className='text-purple-700'>
              Add New FAQ
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Input
              placeholder='Question'
              value={newFaq.question}
              onChange={(e) =>
                setNewFaq({ ...newFaq, question: e.target.value })
              }
              className='border-purple-700 focus:ring-purple-700'
            />
            <Textarea
              placeholder='Answer'
              value={newFaq.answer}
              onChange={(e) =>
                setNewFaq({ ...newFaq, answer: e.target.value })
              }
              className='border-purple-700 focus:ring-purple-700'
            />
          </div>
          <DialogFooter>
            <Button
              className='bg-purple-700 text-white hover:bg-purple-800'
              onClick={handleAddFaq}
            >
              Add FAQ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='bg-white rounded-lg shadow-lg'>
          <DialogHeader>
            <DialogTitle className='text-purple-700'>
              Edit FAQ
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Input
              placeholder='Question'
              value={editFaq?.question || ""}
              onChange={(e) =>
                setEditFaq({ ...editFaq, question: e.target.value } as Faq)
              }
              className='border-purple-700 focus:ring-purple-700'
            />
            <Textarea
              placeholder='Answer'
              value={editFaq?.answer || ""}
              onChange={(e) =>
                setEditFaq({ ...editFaq, answer: e.target.value } as Faq)
              }
              className='border-purple-700 focus:ring-purple-700'
            />
          </div>
          <DialogFooter>
            <Button
              className='bg-purple-700 text-white hover:bg-purple-800'
              onClick={handleEditFaq}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FaqPage;
