import { Button } from "../../components/ui/button";
import { Fragment, useState, useCallback } from "react";
import { Sheet, SheetHeader, SheetContent, SheetTitle } from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { bookSuggestionFormElements } from "../../components/config/index";
import { useDispatch, useSelector } from "react-redux";
import { addNewSuggestion, fetchNewSuggestion } from "../../store/shop/suggestion-slice";
import { useToast } from "../../hooks/use-toast";

const initialFormData = {
    bookName: "",
    author: "",
    category: "",
    requesterName: "",
    bookLink: ""
};

function BookSuggestions() {
    const [openSuggestionDialog, setOpenSuggestionDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { suggestionList } = useSelector((state) => state.suggestions);

    // Check if the form is valid before submission
    const isFormValid = useCallback(() => {
        return Object.values(formData).every((value) => value.trim() !== "");
    }, [formData]);

    // Handle form submission
    const onSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid()) {
            toast({ title: "Please fill all fields", variant: "destructive" });
            return;
        }

        try {
            const response = await dispatch(addNewSuggestion(formData)).unwrap();
            if (response.success) {
                toast({ title: "Book suggestion added successfully" });
                dispatch(fetchNewSuggestion());
                resetForm();
            } else {
                toast({ title: "Failed to add suggestion", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Something went wrong!", variant: "destructive" });
        }
    };

    // Reset form and close modal
    const resetForm = () => {
        setFormData(initialFormData);
        setOpenSuggestionDialog(false);
    };

    return (
        <Fragment>
            {/* Suggest a Book Button */}
            <div className="mb-5 flex justify-end w-full">
                <Button onClick={() => setOpenSuggestionDialog(true)}>Suggest a Book</Button>
            </div>

            {/* Book Suggestions Grid */}
            <div className="gap-4 grid md:grid-cols-3 lg:grid-cols-4">
                {suggestionList?.length > 0 ? (
                    suggestionList.map((suggestion) => (
                        <div key={suggestion._id} className="border rounded-lg p-4 shadow-md">
                            <p><b>Book:</b> {suggestion.bookName}</p>
                            <p><b>Author:</b> {suggestion.author}</p>
                            <p><b>Category:</b> {suggestion.category}</p>
                            <p><b>Requested By:</b> {suggestion.requesterName}</p>
                            {suggestion.bookLink && (
                                <Button
                                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
                                    onClick={() => window.open(suggestion.bookLink, "_blank")}
                                >
                                    View Book
                                </Button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-3">No suggestions available.</p>
                )}
            </div>

            {/* Suggestion Form Modal */}
            <Sheet open={openSuggestionDialog} onOpenChange={setOpenSuggestionDialog}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Suggest a Book</SheetTitle>
                    </SheetHeader>
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText="Submit Suggestion"
                            formControls={bookSuggestionFormElements}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default BookSuggestions;
