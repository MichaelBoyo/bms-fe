import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { BsTrash } from 'react-icons/bs'
import { AiOutlinePlus, AiOutlineSave } from 'react-icons/ai'

interface AvailabilityPeriod {
    startDate: string;
    endDate: string;
}

const AvailabilityPage = (): JSX.Element => {
    const [availabilityPeriods, setAvailabilityPeriods] = useState<AvailabilityPeriod[]>([]);

    const addAvailabilityPeriod = (): void => {
        setAvailabilityPeriods([...availabilityPeriods, { startDate: '', endDate: '' }]);
    };

    const removeAvailabilityPeriod = (index: number): void => {
        setAvailabilityPeriods(availabilityPeriods.filter((_, i) => i !== index));
    };

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const updatedPeriods = [...availabilityPeriods];
        updatedPeriods[index] = { ...updatedPeriods[index], [name]: value };
        setAvailabilityPeriods(updatedPeriods);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log(availabilityPeriods);
        // Send availability periods to the server or perform other actions
    };

    return (
        <>
            <Head>
                <title>Business Owner Availability | Your App</title>
            </Head>
            <div className="container mx-auto">
                <p className="mb-4 text-xl text-gray-400 font-semibold uppercase">Set Availability Periods</p>
                <form onSubmit={handleSubmit}>
                    {availabilityPeriods.map((period, index) => (
                        <div key={index} className="mb-5 border border-gray-400 p-5 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">From</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        placeholder="Start Date"
                                        className="input input-bordered"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">To</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        placeholder="End Date"
                                        className="input input-bordered"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline btn-error text-sm flex items-center"
                                onClick={() => removeAvailabilityPeriod(index)}
                            >
                                <BsTrash />
                                <p>Delete</p>
                            </button>
                        </div>
                    ))}
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="btn btn-outline btn-success"
                            onClick={addAvailabilityPeriod}
                        >
                            <AiOutlinePlus />
                            Add Availability Period
                        </button>
                        <button
                            type="submit"
                            className="btn btn-outline btn-primary"
                        >
                            <AiOutlineSave />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AvailabilityPage;
