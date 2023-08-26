// Import necessary modules and components
import { ReactNode, useEffect } from "react";
import ReactModal from "react-modal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AiFillCloseCircle } from "react-icons/ai";

// Define the type for the props of the Modal component
type ModalProps = {
    children?: ReactNode; // The content of the modal, as ReactNode
    allowClose?: boolean; // Allow the modal to be closed
    shouldCloseOnOverlayClick?: boolean; // Close the modal when clicking outside the content area
    onRequestClose?: () => void; // Callback function to handle close request
    show: boolean; // Control whether the modal is shown or hidden
    loading?: boolean; // Display a loading state for the modal
    width?: string; // Custom width for the modal
};

// Define the Modal component
export default function Modal(props: ModalProps) {
    // Destructure the props
    const {
        children,
        show = false,
        shouldCloseOnOverlayClick = true,
        allowClose = true,
        onRequestClose = () => { },
        loading = false,
        width = "w-full xl:w-[600px]",
    } = props;

    // UseEffect to handle body overflow when the modal is shown/hidden
    useEffect(() => {
        const body = document.body;
        if (show) {
            body.style.overflow = "hidden"; // Hide the scrollbar when the modal is open
        } else {
            body.style.overflow = "unset"; // Restore scrollbar when the modal is closed
        }
    }, [show]);

    return (
        // Use ReactModal from 'react-modal' library
        <ReactModal
            isOpen={show}
            shouldCloseOnOverlayClick={allowClose && shouldCloseOnOverlayClick}
            onRequestClose={onRequestClose}
            className={cn("bg-black p-3", width)}
            overlayClassName="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
            ariaHideApp={false}
            closeTimeoutMS={200}
            style={{
                content: {
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    maxWidth: "90vw",
                    overflow: "hidden",
                    margin: "0 auto",
                },
            }}
        >
            <motion.section layout transition={{ duration: 0.3 }}>
                <section className="modal-content z-50">
                    {/* Close button */}
                    <div className="p-2 flex items-center justify-end">
                        {allowClose && (
                            <button
                                className="modal-close"
                                aria-label="close"
                                onClick={onRequestClose}
                            >
                                <AiFillCloseCircle className="text-white w-10 h-10" />
                            </button>
                        )}
                    </div>
                    {/* Modal content */}
                    <section className="p-5 max-h-[50vh] overflow-y-scroll">{children}</section>
                </section>
            </motion.section>
        </ReactModal>
    );
}
