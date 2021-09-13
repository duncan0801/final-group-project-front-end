import create from "zustand";
import { devtools } from "zustand/middleware";
import { backEndBaseURL } from "./helpers";

export type Faq = {
	id: number;
	question: string;
	answer: string;
};
export type User = {
	id: number;
	firstName: string;
	lastName: string;
	avatar: string;
	username: string;
	password: string;
	counsellor_ID?: number;
	appointments?: Appointment[];
	messages?: Message[];
	reviews?: Review[];
	conversation?: Conversation;
};
export type Conversation = {
	id: number;
	counsellor_ID: number;
	user_ID: number;
};
export type Service = {
	id: number;
	name: string;
};
export type Language = {
	id: number;
	language: string;
	counsellors: Counsellor[];
};
export type CounsellorOnLanguage = {
	id: number;
	language_ID: number;
	counsellor_ID: number;
	counsellor?: Counsellor;
	language?: Language;
};
export type CounsellorOnService = {
	id: number;
	counsellor_ID: number;
	service_ID: number;
	counsellor: Counsellor;
	service: Service;
};
export type Counsellor = {
	id: number;
	firstName: string;
	lastName: string;
	about: string;
	licensing: string;
	avatar: string;
	hourlyRate: number;
	yearsExperience: number;
	gender: string;
	appointments: Appointment[];
	messages: Message[];
	reviews: Review[];
	specialties: Service[];
	languages: Language[];
};
export type Review = {
	id: number;
	date: string;
	content: string;
	user_ID: number;
	counsellor_ID: number;
	user?: User;
	counsellor?: Counsellor;
};
export type Message = {
	id: number;
	date: string;
	content: string;
	user_ID: number;
	counsellor_ID: number;
	user?: User;
	counsellor?: Counsellor;
};
export type Appointment = {
	id: number;
	date: string;
	time: string;
	user_ID: number;
	counsellor_ID: number;
};

export type LoggedinUser = {
	id: number;
	username: string;
};

type Store = {
	faqs: Faq[] | null;
	setFaqs: (faqs: Faq[]) => void;
	services: Service[] | null;
	setServices: (services: Service[]) => void;
	counsellors: Counsellor[] | null;
	setCounsellors: (counsellors: Counsellor[]) => void;
	counsellor: Counsellor | null;
	filteredCounsellors: [] | Counsellor[];
	setFilteredCounsellors: (counsellors: Counsellor[]) => void;
	setCounsellor: (counsellor: Counsellor) => void;
	user: User | null;
	setUser: (user: User) => void;
	loggedinUser: LoggedinUser | null;
	setLoggedinUser: (loggedinUser: User | null) => void;
	languages: Language[] | null;
	setLanguages: (languages: Language[]) => void;
	reviews: Review[] | null;
	setReviews: (reviews: Review[]) => void;
	messages: Message[] | null;
	setMessages: (messages: Message[]) => void;
	appointments: Appointment[] | null;
	setAppointments: (appointments: Appointment[]) => void;
	serviceName: string[] | [];
	setServiceName: (serviceName: string[]) => void;
	messageField: string;
	setMessageField: (message: string) => void;
	userMessages: Message[] | null;
	setUserMessages: (messages: Message[]) => void;
	postMessage: (
		date: string,
		content: string,
		user_ID: number,
		conversation_ID: number
	) => Promise<unknown>;
	fetchMessagesByConversationId: (conversation_ID: number) => void;

	fetchFaqs: () => void;
	fetchServices: () => void;
	fetchCounsellors: () => void;
	fetchCounsellorById: (id: string) => void;
	fetchUser: (loggedinUser: LoggedinUser) => void;
	fetchLanguages: () => void;
	fetchReviews: () => void;
	filterCounsellorsByService: () => Counsellor[] | null | void;
	onDelete: (appointment: Appointment) => Promise<Appointment[] | void>;
};

const useStore = create<Store>(
	devtools((set, get) => ({
		faqs: null,
		setFaqs: (faqs) => set({ faqs: faqs }),
		services: null,
		setServices: (services) => set({ services: services }),
		counsellors: null,
		setCounsellors: (counsellors) => set({ counsellors: counsellors }),
		counsellor: null,
		setCounsellor: (counsellor) => set({ counsellor: counsellor }),
		filteredCounsellors: [],
		setFilteredCounsellors: (counsellors) =>
			set({ filteredCounsellors: counsellors }),
		user: null,
		setUser: (user) => set({ user: user }),
		languages: null,
		setLanguages: (languages) => set({ languages: languages }),
		reviews: null,
		setReviews: (reviews) => set({ reviews: reviews }),
		messages: null,
		setMessages: (messages) => set({ messages: messages }),
		appointments: null,
		setAppointments: (appointments) => set({ appointments: appointments }),
		loggedinUser: null,
		setLoggedinUser: (loggedinUser) => set({ loggedinUser: loggedinUser }),
		serviceName: [],
		setServiceName: (serviceName) => set({ serviceName: serviceName }),
		messageField: "",
		setMessageField: (message) => set({ messageField: message }),
		userMessages: null,
		setUserMessages: (messages) => set({ userMessages: messages }),

		fetchFaqs: () => {
			fetch(`${backEndBaseURL}/faq`)
				.then((res) => res.json())
				.then((entity) => set({ faqs: entity.data }));
		},
		fetchServices: () => {
			fetch(`${backEndBaseURL}/services`, { credentials: "include" })
				.then((res) => res.json())
				.then((entity) => set({ services: entity.data }));
		},
		fetchCounsellors: () => {
			fetch(`${backEndBaseURL}/counsellors`)
				.then((res) => res.json())
				.then((entity) => set({ counsellors: entity.data }));
		},
		fetchCounsellorById: (id) => {
			fetch(`${backEndBaseURL}//counsellors/${id}`)
				.then((res) => res.json())
				.then((counsellor) => set({ counsellor: counsellor.data }));
		},
		fetchUser: (loggedinUser) => {
			fetch(`${backEndBaseURL}/user/${loggedinUser.id}`, {
				credentials: "include",
			})
				.then((res) => res.json())
				.then((entity) => set({ user: entity.data }));
		},
		fetchLanguages: () => {
			fetch(`${backEndBaseURL}/languages`)
				.then((res) => res.json())
				.then((entity) => set({ languages: entity.data }));
		},
		fetchReviews: () => {
			fetch(`${backEndBaseURL}/reviews`, { credentials: "include" })
				.then((res) => res.json())
				.then((entity) => set({ reviews: entity.data }));
		},
		filterCounsellorsByService: () => {
			const counsellors = get().counsellors;
			const setFilteredCounsellors = get().setFilteredCounsellors;
			const serviceName = get().serviceName;
			console.log("serviceName", serviceName);

			if (counsellors && serviceName) {
				console.log("hey");

				const filteredCounsellors: Counsellor[] = counsellors.filter(
					({ specialties }) =>
						specialties.find((specialty) =>
							serviceName.includes(specialty.name as never)
						)
				);
				console.log("counsellors", counsellors);
				console.log("services", serviceName);
				console.log("filtered", filteredCounsellors);
				console.log("hello");

				setFilteredCounsellors(filteredCounsellors);
			} else {
				console.log("not working");
				return counsellors;
			}
		},

		fetchMessagesByConversationId(conversation_ID) {
			fetch(
				`${backEndBaseURL}/messages/conversation/${conversation_ID}`,
				{
					credentials: "include",
				}
			)
				.then((res) => res.json())
				.then((entity) => {
					get().setUserMessages(entity.data);
					console.log(entity);
				});
		},
		postMessage(date, content, user_ID, conversation_ID) {
			return fetch(`${backEndBaseURL}/messages`, {
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					date,
					content,
					user_ID,
					conversation_ID,
				}),
			})
				.then((res) => res.json())
				.then((entity) => {
					const userMessages = get().userMessages;
					const setUserMessages = get().setUserMessages;
					if (entity.data) {
						userMessages
							? setUserMessages([...userMessages, entity.data])
							: setUserMessages([entity.data]);
					}
				});
		},

		onDelete(appointment: Appointment) {
			return fetch(`${backEndBaseURL}/appointments/${appointment.id}`, {
				credentials: "include",
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then(() => {
					const user = get().user;
					let updatedAppointments = user?.appointments?.filter(
						(app) => app.id !== appointment.id
					);
					if (user) {
						get().setUser({
							...user,
							appointments: updatedAppointments,
						});
					}
				});
		},
	}))
);

export default useStore;
