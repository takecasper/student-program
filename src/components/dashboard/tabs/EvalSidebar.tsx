import { useState } from "react"
import * as Select from '@radix-ui/react-select';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const labels = [
  { value: 'N/A', label: 'N/A', description: '' },
  { value: '1', label: '1', description: 'Demonstrates significant deficits' },
  { value: '2', label: '2', description: '--' },
  { value: '3', label: '3', description: 'Demonstrates knowledge of core areas with occasional gaps' },
  { value: '4', label: '4', description: '--' },
	{ value: '5', label: '5', description: 'Demonstrates knowledge of core areas; no significant gaps'},
  { value: '6', label: '6', description: '--' },
  { value: '7', label: '7', description: 'Demonstrates extensive knowledge; explains pathophysiology for signs and symptoms' },
];

const ratingOptions = ['N/A', 'Below Expectations', 'Meets Expectations', 'Exceeds Expectations'];

const fields = [
  { label: 'Knowledge and Its Application', key: 'knowledge' },
  { label: 'Interviewing', key: 'interviewing' },
  { label: 'Physical Exam/ Mental Status Skills', key: 'physicalExam' },
];

const EvalSidebar = () => {
	const [step, setStep] = useState(0)
	const [setting, setSetting] = useState('');
	const [number, setNumber] = useState('');
	const [ratings, setRatings] = useState({
    knowledge: 'N/A',
    interviewing: 'N/A',
    physicalExam: 'N/A',
  });
  const [selected, setSelected] = useState('N/A');

  const handleChange = (field: keyof typeof ratings, value: string) => {
    setRatings({ ...ratings, [field]: value });
  };

	const backStep = () => {
		setStep(step - 1)
	}

	const nextStep = () => {
		setStep(step + 1)
	}

	return (
		<div className=" absolute z-10 right-4 top-[85px] h-[calc(100vh-101px)] w-full md:w-2/5 lg:w-1/3 border-l border-gray-200 bg-white p-[35px] shadow-md font-sans max-w-[485px]">
       {/* Header Info */}
			 <div className="text-[16px] text-[#1B1B1B] mb-5 space-y-1 leading-snug">
        <p>
          <span className="font-medium">Evaluated by:</span>{' '}
          <span className="text-[#00A6A7] cursor-pointer">Frank H Netter MD</span>
        </p>
        <p><span className="font-medium">Evaluating:</span> MD</p>
        <p><span className="font-medium">Dates:</span> April 2025 - April 2026</p>
      </div>

      {/* Title */}
      <h2 className="text-[20px] font-semibold text-[#1B1B1B] mb-1">
        Year 3 Student Clinical Performance Assessment
      </h2>
      <p className="text-[16px] text-[#666666] mb-4">
        <span className="text-[#D32F2F] font-medium">*</span> indicates a mandatory response
      </p>

      {/* Buttons */}
      <div className="flex space-x-2 mb-5">
        <button className="text-[10px] font-medium px-5 py-1.5 rounded-full bg-[#364699] text-white border border-[#2D3EEC] hover:bg-blue-700 cursor-pointer">
          GUIDE
        </button>
        <button className="text-[10px] font-medium px-5 py-1.5 rounded-full bg-white text-[#1B1B1B] border border-gray-300 hover:bg-gray-100 cursor-pointer">
          FORM
        </button>
      </div>

      {/* Instructions */}
      <div className="text-[16px] text-[#1B1B1B] leading-[22px] space-y-4 relative overflow-auto h-[495px] p-1">
				{step == 0 ? <>
					<h3 className="font-medium">4 Simple Steps for Providing an Effective Clinical Performance Assessment</h3>

					<div>
						<p className="font-semibold mb-1">1. Follow guidance for good clinical assessments:</p>
						<ul className="list-disc pl-5 space-y-2 text-[#1B1B1B]">
							<li>Student performance differs across domains and ratings should vary</li>
							<li>Narrative comments should be consistent with rating numbers.</li>
							<li>Avoid unconscious bias (i.e. giving higher ratings for students who are similar to us)</li>
							<li>If you were not able to observe performance in a competency, check the “N/A” box. This will not reflect negatively on you or the student.</li>
						</ul>
					</div>

					<div>
						<p className="font-semibold">
							2. In your narrative, reinforce around two strengths with positive comments, and highlight around two for growth, and describe specific activities for the student (eg, &quot;iHere are suggestions that may assist you&quot;)
						</p>
					</div>

					<div>
						<p className="font-semibold">
							3. Contact the Clerkship Director immediately for any low scores (below a &quot;03&quot;) or if you have any other concerns about the student&apos;s performance, including concerns about professional behaviors
						</p>
					</div>

					<div>
						<p className="font-semibold">
							4. Review the form with the student at the end of your time with them and submit the form as soon as possible.
						</p>
					</div>
					{/* Date Field */}
					<div className="space-y-1">
						<label className="font-medium">
							Dates worked with this student <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								type="date"
								className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					{/* Site Field */}
					<div className="space-y-1">
						<label className="font-medium">
							Site <span className="text-red-500">*</span>
						</label>
						<input
							type="url"
							placeholder="URL"
							className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Setting */}
					<div className="space-y-2">
						<label className="font-medium">
							Setting: <span className="text-red-500">*</span>
						</label>
						<div className="space-y-2">
							{['Inpatient', 'Outpatient', 'Head Evaluator Form'].map((option) => (
								<label key={option} className="flex items-center gap-2 cursor-pointer">
									<input
										type="radio"
										name="setting"
										value={option}
										checked={setting === option}
										onChange={() => setSetting(option)}
										className="accent-blue-600"
									/>
									{option}
								</label>
							))}
						</div>
					</div>

					{/* Other Status */}
					<div className="space-y-1">
						<label className="font-medium">Other Status</label>
						<input
							type="text"
							placeholder="Type in Status"
							className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Number of days observing the student */}
					<div className="space-y-2">
						<label className="font-medium">
							Number of days observing the student: <span className="text-red-500">*</span>
						</label>
						<div className="space-y-2">
							{['1 day or less', '2-3 days', '4-7 days', '8-14 days', '>14 days', 'Head Evaluator Form'].map((option) => (
								<label key={option} className="flex items-center gap-2 cursor-pointer">
									<input
										type="radio"
										name="number"
										value={option}
										checked={number === option}
										onChange={() => setNumber(option)}
										className="accent-blue-600"
									/>
									{option}
								</label>
							))}
						</div>
					</div>
				</>:<></>}
				{step == 1 ? <>
					{/* Instructions */}
					<p className="text-[14px] text-[#1B1B1B] leading-[22px]">
						Please read the performance descriptors carefully. If the student&apos;s performance falls between categories,
						choose the rating between the appropriate descriptors.
					</p>

					{/* Dropdown Fields */}
					<div className="space-y-6 w-full max-w-md text-sm text-[#1B1B1B]">
						{fields.map(({ label, key }) => (
							<div key={key} className="space-y-1">
								<label className="font-medium">
									{label} <span className="text-red-500">*</span>
								</label>

								<Select.Root
									value={ratings[key as keyof typeof ratings]}
									onValueChange={(value) => handleChange(key as keyof typeof ratings, value)}
								>
									<Select.Trigger
										className="inline-flex items-center justify-between w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
										aria-label={label}
									>
										<Select.Value />
										<Select.Icon className="ml-2">
											<ChevronDownIcon className="w-5 h-5 text-gray-500" />
										</Select.Icon>
									</Select.Trigger>

									<Select.Portal>
										<Select.Content
											className="z-50 w-[var(--radix-select-trigger-width)] rounded-md border border-gray-200 bg-white shadow-lg"
											position="popper"
										>
											<Select.Viewport className="p-1 text-sm">
												{ratingOptions.map((option) => (
													<Select.Item
														key={option}
														value={option}
														className="group flex justify-between items-center px-4 py-3 rounded-md cursor-pointer select-none hover:bg-gray-100 data-[state=checked]:bg-gray-100"
													>
														<Select.ItemText className="font-medium">{option}</Select.ItemText>
													</Select.Item>
												))}
											</Select.Viewport>
										</Select.Content>
									</Select.Portal>
								</Select.Root>
							</div>
						))}
					</div>

					<div className="w-full max-w-md text-sm text-[#1B1B1B] space-y-2">
						<label className="font-medium block mt-2">
							Knowledge and Its Application <span className="text-red-500">*</span>
						</label>

						<Accordion.Root type="single" collapsible className="w-full">
							<Accordion.Item value="rating">
								{/* Trigger Button */}
								<Accordion.Trigger
									className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none data-[state=open]:rounded-b-none transition"
								>
									<span>{selected}</span>
									<ChevronDownIcon className="w-5 h-5 text-gray-500 transition-transform data-[state=open]:rotate-180" />
								</Accordion.Trigger>

								{/* Dropdown Panel */}
								<Accordion.Content
									className="border border-t-0 border-gray-300 bg-white rounded-b-md shadow-sm overflow-hidden animate-slideDown"
								>
									{labels.map((option, idx) => (
										<div
											key={option.value}
											onClick={() => setSelected(option.value)}
											className={`flex justify-between items-start px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm ${
												idx !== ratingOptions.length - 1 ? 'border-b border-gray-200' : ''
											}`}
										>
											<span className="font-medium">{option.value}</span>
											<span className="text-gray-500 text-xs text-right ml-4 w-2/3">
												{option.description}
											</span>
										</div>
									))}
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
					</div>
				</>:<></>}
      </div>

      {/* Sticky Footer */}
      <div className="absolute bottom-0 left-0 w-full px-8 py-4 bg-white border-t border-gray-200 flex justify-end">
				{step ?
					<button onClick={() => backStep()}  className="px-6 py-2 border border-gray-300 rounded-full bg-white text-xs font-medium hover:bg-gray-100 mr-3 cursor-pointer">
						Back
					</button>:<></>
				}
        <button onClick={() => nextStep()} className="bg-[#364699] text-white text-[12px] font-medium py-2 px-7 rounded-full hover:bg-blue-700 transition cursor-pointer">
          Next
        </button>
      </div>
    </div>
	)
}

export default EvalSidebar