// Real, verbatim patient reviews from Riverdell Vision's public Google Business
// Profile (5.0 across 448 reviews) and Zocdoc (4.91 across 396 reviews). Names
// are as publicly posted by the reviewers; Zocdoc entries whose initials are
// hidden are attributed to "Zocdoc patient". Text is quoted verbatim; only
// obvious truncation is trimmed to a complete sentence, stray spacing around
// punctuation is normalized, and obvious word-level typos are left as-is. Do not
// paraphrase or invent. Rating-only Zocdoc entries (a star with no written
// words) are not listed here because a card has nothing to quote; the headline
// counts above already reflect the full review volume. Each review is tagged
// with the canonical service(s) it references so service pages can pull their
// own matching reviews.
//
// Reviews are authored below in two source-grouped arrays for clarity of
// provenance, then combined into the exported REVIEWS via interleaveBySource so
// any top slice (homepage proof, service grids, schema, the wall's first cards)
// shows a balanced 50/50 Google/Zocdoc mix when possible.

export type ServiceId =
  | "myopia"
  | "ortho-k"
  | "dry-eye"
  | "specialty-lenses"
  | "vision-therapy"
  | "neuro-rehab"
  | "medical"
  | "pediatric-family"
  | "comprehensive";

// Canonical service metadata. `slug` maps a tag to its service page (null =
// category only, no dedicated page). `label` is the human display used on
// review cards and filter chips.
export const SERVICE_META: { id: ServiceId; label: string; slug: string | null }[] = [
  { id: "myopia", label: "Myopia management", slug: "myopia-management" },
  { id: "ortho-k", label: "Ortho-K", slug: "ortho-k" },
  { id: "dry-eye", label: "Dry eye", slug: "dry-eye-treatment" },
  { id: "specialty-lenses", label: "Specialty & contact lenses", slug: "specialty-contact-lenses" },
  { id: "vision-therapy", label: "Vision therapy", slug: "vision-therapy" },
  { id: "neuro-rehab", label: "Neuro-optometric rehab", slug: "neuro-optometric-rehabilitation" },
  { id: "medical", label: "Medical eye care", slug: "medical-eye-care" },
  { id: "pediatric-family", label: "Pediatric & family", slug: null },
  { id: "comprehensive", label: "Comprehensive care", slug: null },
];

export type Review = {
  name: string;
  source: "Google" | "Zocdoc";
  rating: 5;
  services: ServiceId[];
  quote: string;
};

const GOOGLE_REVIEWS: Review[] = [
  {
    name: "Katherine Rodriguez",
    source: "Google",
    rating: 5,
    services: ["pediatric-family"],
    quote: `I first came to Dr. Han as a patient myself, and now she treats both of my children too. She's truly exceptional, so kind, patient, and thorough. Even my kids adore her. In fact, my 5-year-old walked out of the office today and said, "I love my doctor!" That says it all.`,
  },
  {
    name: "Hannah Verbrugge",
    source: "Google",
    rating: 5,
    services: ["myopia"],
    quote: `Have been a patient here for over thirteen years, and have done all of their myopia treatments - wonderful office! The quality of care is amazing, and all the doctors are super thorough and knowledgeable. The front desk is also very warm and welcoming -- truly cannot think of a better office to address all of my eye needs.`,
  },
  {
    name: "Irene Voce",
    source: "Google",
    rating: 5,
    services: ["specialty-lenses", "medical"],
    quote: `I have an unusual and complicated vision situation caused by a retinal detachment and subsequent surgical repair. Dr Bruce Meyer was very knowledgeable, patient, caring and compassionate about finding a optical solution for me. After visiting several doctors, I feel the closest to a solution with his help.`,
  },
  {
    name: "Joe Spivack",
    source: "Google",
    rating: 5,
    services: ["vision-therapy"],
    quote: `Outstanding care team. Great care from courteous and attentive professionals. So grateful to do eye therapy with Victoria. Motivating and a joy to work with.`,
  },
  {
    name: "Su RV",
    source: "Google",
    rating: 5,
    services: ["vision-therapy", "pediatric-family"],
    quote: `I have to say the best service I have had by far. My son is getting vision therapy and Victoria is great with him. Victoria is very knowledgeable and takes her time explaining and with treatment.`,
  },
  {
    name: "Al R",
    source: "Google",
    rating: 5,
    services: ["neuro-rehab"],
    quote: `Always a great experience with top notch staff. They have deep experience helping concussed patients with recovery.`,
  },
  {
    name: "Manpreet Kaur",
    source: "Google",
    rating: 5,
    services: ["comprehensive", "medical"],
    quote: `THE BEST! Dr. Amy Mundanchira is the best optometrist I have ever seen. Knowledgeable, takes time, kind, able to handle complex medical histories and really listens!`,
  },
  {
    name: "Chris Bielecki",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `I've gone to Riverdell Vision for somewhere around two decades now; starting as a patient with Dr. Meyers and now Dr. Han. It always was and continues now to be a great place with a professional and very friendly staff who take the time to answer all your questions and find the best solution for your eye care needs.`,
  },
  {
    name: "Marko Vujovic",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `Exceptional staff and eye doctor. Everything from the sign in process, VR devices and examination machines is well managed, up to date, clean and efficient. The doctor and staff are very helpful and answered all the questions I had. Would definitely recommend.`,
  },
  {
    name: "Myles Mittwol",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han is outstanding. Very knowledgeable, thorough and took the time to get everything perfect. Highly recommend her. The staff was great. And the remodeled new office is outstanding.`,
  },
  {
    name: "Nick Gallipoli",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `Great staff and facility! Dr. Amy Mundanchira provided a thorough exam and a perfect prescription for my new lenses.`,
  },
  {
    name: "Sharon Rys",
    source: "Google",
    rating: 5,
    services: ["medical"],
    quote: `I saw Dr Meyer because my vision was poor with my current eyeglass prescription. He did an eye exam and spent a lot of time with me. After the visit he gave me a new prescription but told me that sooner than later I will need cataract surgery. I was very satisfied with the visit.`,
  },
  {
    name: "Paul Lee",
    source: "Google",
    rating: 5,
    services: ["specialty-lenses"],
    quote: `Excellent eyecare! Dr. Mina Han is amazing and was attentive to all the details during my eye checkup. She made sure my contact lens fit perfectly and that I got the right pair of glasses.`,
  },
  {
    name: "Jackie Guenego",
    source: "Google",
    rating: 5,
    services: ["specialty-lenses"],
    quote: `Dr Han is very attentive and caring. She is happy to work with you to find the perfect contact lens prescription, which in my case, takes a lot of tweaking. It's always a very pleasant experience.`,
  },
  {
    name: "Magdalena Jordán",
    source: "Google",
    rating: 5,
    services: ["specialty-lenses", "comprehensive"],
    quote: `Wonderful experience. The best eye exam I ever had. The office is very modern and welcoming. Dr. Mina Han explained all the options clearly and took her time making sure I understood everything and tried as many contact lenses as I needed.`,
  },
  {
    name: "Park Family",
    source: "Google",
    rating: 5,
    services: ["pediatric-family"],
    quote: `We love Riverdell Vision! Staff is very kind and knowledgeable. Dr. Han is very good with kids, and still takes the time to explain to the parents what is going on. I feel confident in her care for myself and my kids.`,
  },
  {
    name: "Ahnes Jwa",
    source: "Google",
    rating: 5,
    services: ["pediatric-family"],
    quote: `It was so great to meet Dr.Mina Han for my 7 years old son, she is so professional and there is a reason for the good review. Hope we meet her for long time here.`,
  },
  {
    name: "Eunyoung Ham",
    source: "Google",
    rating: 5,
    services: ["pediatric-family"],
    quote: `I had a wonderful experience at Rivendell Vision today. I brought both of my parents in for their checkups, and everything was excellent.`,
  },
  {
    name: "Robert Lebron",
    source: "Google",
    rating: 5,
    services: ["pediatric-family"],
    quote: `Friendly staff, knowledgeable, courteous, kind, and beyond friendly. The doctors were extremely gentle with my son and made him feel very comfortable. Would highly recommend this practice.`,
  },
  {
    name: "Roy Tamargo",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr Bruce Meyer and his staff provide personalized eyecare second to none. I came all the way from Florida to maintain my eyecare with the practice.`,
  },
  {
    name: "Steve",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `Riverdell Vision is as professional and caring as they are warm and friendly. Always feel safe and confident while Dr Han examines and explains. Very patient and never rushed.`,
  },
  {
    name: "Michael Bertuzzi",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Mina Han was thorough. RiverDell vision has the latest technology to ensure your eyes are healthy. Great selection of glasses and options to choose from. I found my new Optometrist.`,
  },
  {
    name: "Jessica Furnari",
    source: "Google",
    rating: 5,
    services: ["myopia", "pediatric-family"],
    quote: `Dr. Mina and all the staff at Riverdell Vision were so welcoming to my family of four. I never had such a thorough exam. Ran multiple tests to check my daughter's vision to monitor any progression in her prescription.`,
  },
  {
    name: "Suzy Julis",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `I've been a patient of Dr. Meyer for many years. As always he is friendly and provides excellent eye care and is thorough, detailed, and very professional. I highly recommend this office and staff for your vision needs.`,
  },
  {
    name: "Lili baumz",
    source: "Google",
    rating: 5,
    services: ["comprehensive"],
    quote: `Professional staff and beautiful office, with up to date technology. Dr. Meyer is thorough and has a great bedside manner.`,
  },
];

const ZOCDOC_REVIEWS: Review[] = [
  // Substantive, multi-detail reviews lead so curated top slices stay strong.
  {
    name: "Matthew H.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Always a great experience going to Riverdell Vision. Dr Han is an outstanding optometrist. She's an expert at what she does, she listens, and is thorough in all her evaluations. She's always incorporating the latest technology, techniques, and methods from her field. The service is stellar and the staff are all friendly. Would highly recommend!`,
  },
  {
    name: "Melanie T.",
    source: "Zocdoc",
    rating: 5,
    services: ["dry-eye", "medical"],
    quote: `Dr. Han was amazing! I've been having a ton of eye issues where other doctors dismissed to "just being my contacts". I learned I had an underlying issue with clogged pores and immediately worked with me on a new care plan. Will definitely be going to Dr. Han for all my eye appts!`,
  },
  {
    name: "Peter C.",
    source: "Zocdoc",
    rating: 5,
    services: ["medical"],
    quote: `Dr Han was very friendly and knowledgeable. I went in with a symptom that I wasn't sure what it was, and she was able to diagnose and provide the proper medication to resolve along with steps I can take to prevent this issue from recurring. Location was quite far from where I live (45 min drive) but was well worth the trip.`,
  },
  {
    name: "Anna M.",
    source: "Zocdoc",
    rating: 5,
    services: ["specialty-lenses"],
    quote: `Amazing doctors. Very thorough. I was on a contact prescription most of my life not knowing there was an alternative. She recommended another brand that was not only more comfortable, but also was most cost effective.`,
  },
  {
    name: "Sara G.",
    source: "Zocdoc",
    rating: 5,
    services: ["specialty-lenses"],
    quote: `Great experience with Dr. Han and I am excited that we have a plan (and back-up) while trying a new lenses.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Kindest staffs and doctor ever! Doctor Han explained all the details very kindly in Korean and English as well.`,
  },
  {
    name: "Michael P.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han is the best choice in the Bergen County for optometry and general eye health. Her professionalism, knowledge, and thoughtfulness are above and beyond what other local eye care practices offer.`,
  },
  {
    name: "Rishmal M.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han was amazing, answered all my questions, and explained every test and image. I've never been so informed by an optometrist before. Fantastic experience, virtually no wait time, and great selection of frames.`,
  },
  {
    name: "Jordan F.",
    source: "Zocdoc",
    rating: 5,
    services: ["specialty-lenses", "comprehensive"],
    quote: `Dr. Han is really a pleasure to work with. She is very friendly, explains everything and answers questions thoroughly. Her staff is also great. The gentleman that helped me decide between new glasses or just getting new lenses put into my existing frames seems genuinely passionate about helping you find the right fit. Overall another great experience.`,
  },
  {
    name: "Joseph T.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han and the staff at Riverdell Family Vision Care were great. Very friendly and explained things simply and in detail. The office was very clean and they are taking precautions during the pandemic. I came in for a routine eye exam and they were not pushy trying to get me to purchase glasses or contact lenses during my visit.`,
  },
  {
    name: "Jeniffer C.",
    source: "Zocdoc",
    rating: 5,
    services: ["pediatric-family"],
    quote: `Had mine and my 2 children's first appointment today and had an amazing experience. From the time I called to book the appointment, to checking in, and meeting Dr. Han, it was such a pleasant experience. It is a bit of a drive for us, but distance is never an issue when you receive great care.`,
  },
  {
    name: "K R",
    source: "Zocdoc",
    rating: 5,
    services: ["pediatric-family", "comprehensive"],
    quote: `The screening tests were very thorough. I was confident that they obtained all the info they needed to give me an accurate diagnosis. The doctor was very sweet, funny, reassuring and most of all, knowledgeable. I'd be back and will likely start bringing my children here as well!`,
  },
  {
    name: "Solomon K.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Most friendly doctor i've ever had. Opens floors for questions, explains what she's doing and why, helps with reception, etc. Probably best doctor of any field i've had`,
  },
  {
    name: "Anna S.",
    source: "Zocdoc",
    rating: 5,
    services: ["pediatric-family", "comprehensive"],
    quote: `Wonderful experience seeing Dr. Han by my entire family! No complaints!`,
  },
  {
    name: "Brian C.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `I usually feel nervous when I go to the doctor for a checkup but Dr. Han and team made the visit seem pleasant and smooth. Dr. Han has a friendly and professional approach on the entire visit. She was informative and helpful.`,
  },
  {
    name: "Jessica L.",
    source: "Zocdoc",
    rating: 5,
    services: ["specialty-lenses", "comprehensive"],
    quote: `Dr. Mina Pi Han is very thorough and makes sure that your prescription for glasses and contacts is just right. More importantly, she really cares about her patients and is very warm and friendly. She takes time to answer any questions and helps you feel comfortable.`,
  },
  {
    name: "Klaudia K.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han is so patient and personable. I know that she truly cares about me as a patient and does everything to make me comfortable even if it takes more time or effort from her. Best experience I've had with an optometrist.`,
  },
  {
    name: "Jordan F.",
    source: "Zocdoc",
    rating: 5,
    services: ["pediatric-family", "comprehensive"],
    quote: `Dr. Han and her staff were terrific! They were super-nice, thoughtful, and very thorough in explaining everything throughout the appointment. I appreciate how personable Dr. Han was, and she made me feel very comfortable. I look forward to continuing using their office and have already referred my family members to them.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `I booked my appointment on Zocdocs, with very short notice. There was an opening at the time I needed and that was what I booked. When I arrived, they were aware of my booking and I was seen immediately. I barely sat down. The doctor was very professional, very conversational, and such a pleasure to see. You can tell she loves what she does and has a passion for her profession.`,
  },
  {
    name: "Vijay L.",
    source: "Zocdoc",
    rating: 5,
    services: ["specialty-lenses", "comprehensive"],
    quote: `Very helpful and knowledgeable. Wanted to make sure that I would use the glasses and adjusted the prescription accordingly. Definitely above and beyond.`,
  },
  {
    name: "Julia M.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr Han is so great! been going to her and Dr Meyer at River Dell Optometry for years and they're both amazing`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Amazing Staff and Doctor! I have been looking for a new Eye Doctor for the longest time, and Dr. Mina Han and her staff were the absolute best! I look forward to all of my future appointments!`,
  },
  {
    name: "Carolyn O.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Loved my visit with Dr Han! Dr Han and her staff were very friend, efficient and the exam was very thorough. I would highly recommend her to my friends and family.`,
  },
  {
    name: "Elizabeth Jennifer S.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `I followed Dr. Han from a previous location. She's a fantastic doctor and I will continue seeing her.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han is the best! She listens to your concerns and gives helpful advice and directions. The office is very clean and the staffs are attentive and ready for assistance.`,
  },
  {
    name: "Allison A.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `I really loved doctor Han and the ladies helping at the front desk. So glad i chose them for my first eye exam ever.`,
  },
  {
    name: "Justin S.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr Han was knowledgeable and very nice. The office was clean and I was seen at my appointment time.`,
  },
  {
    name: "Thomas S.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han and her staff were wonderful! It was my first time there and I intend on going back for my annual eye exams.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `got a thorough eye exam, Dr. Han answered all my questions and made clear the options for next steps`,
  },
  {
    name: "Elaine P.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `She was very thorough and explained everything as we went along. The office staff were also pleasant and professional.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["specialty-lenses"],
    quote: `The best doc I have ever seen so far. Very informative and she found out that I was miss prescribed for my contacts previously.`,
  },
  {
    name: "Bhakti P.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `First time going and everything was great! Staff was very friendly and Dr. Han was very through and knowledgeable.`,
  },
  {
    name: "Armel F.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Convenient. Efficient and easy booking. Very clean and new office. Very friendly staff.`,
  },
  {
    name: "Anthony T.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Great doctor and highly recommend! Best eye exam of my life!`,
  },
  {
    name: "Nadeem M.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han and her staff were great. Everyone was courteous and very professional.`,
  },
  {
    name: "Katyia G.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr.Han & her staff are very friendly & professional. I'm happy to have her as my doctor.`,
  },
  {
    name: "Anthony P.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Great staff, clean office and Dr. Min was a pleasure to work with.`,
  },
  {
    name: "Griselda T.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `My first time , I love my time there , wonderful team, i really like Dr.Mina , very professional and friendly, I definitely will recommend her.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["pediatric-family"],
    quote: `Always a great experience with Dr. Han and the whole office staff. Our entire family goes to this office!`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["medical"],
    quote: `Great bedside manner from the doctor and the staffs were incredibly friendly! It was an emergency appointment made over the weekend and the doctor and the staffs immediately accommodated me even though they couldn't find my booking. Highly recommend this office!`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `The office staff was warm, friendly and super efficient. Dr. Han was wonderful. She is a great communicator and took the time to explain things to me, every step of the way. Highly recommend her!`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Extremely knowledgeable and very comprehensive exam. Willing to answer any pertinent questions when asked. I would strongly recommend Dr. Han and her team!`,
  },
  {
    name: "Wusuk K.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han's accurate and prompt examination and judgment stood out.`,
  },
  {
    name: "George L.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han is very nice and takes her time to explain so that everything is understood.`,
  },
  {
    name: "Andrew L.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Great office and great doctor. Will go back for sure`,
  },
  {
    name: "Nancy M.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Very professional, thorough, courteous, and knowledgeable`,
  },
  {
    name: "Lianna N.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Great bedside manner and cleanly office! Highly recommend`,
  },
  {
    name: "Arthur F.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `it was my first time there and they treated very good. very friendly as well.`,
  },
  {
    name: "Göktug A.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `She was very nice, caring and informative.`,
  },
  {
    name: "Ayman T.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Was very satisfied with the office visit since arrived through the end of the visit.`,
  },
  {
    name: "Thomas L.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Very friendly and knowledgeable.`,
  },
  {
    name: "Salman M.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Knowledgeable and very professional`,
  },
  {
    name: "Kara C.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Extremely pleasant experience overall.`,
  },
  {
    name: "Andrew V.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Fantastic experience. Will recommend!`,
  },
  {
    name: "Tara G.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Great experience, highly recommend!`,
  },
  {
    name: "Frank P.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Very friendly Dr. And staff.`,
  },
  {
    name: "Eun S.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Excellent medical equipment onsite`,
  },
  {
    name: "Jaime C.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `She is really nice and patient with you`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Entire staff was very helpful and friendly. Was seen right away.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Nice doctor, nice office and staff.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `She was amazing and personable`,
  },
  {
    name: "Thomas S.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `She's great!`,
  },
  {
    name: "Michael H.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Loved it!`,
  },
  {
    name: "Yujia J.",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Very good`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Amazing place!`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Awesome, Dr. Han`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Dr. Han was great!!!`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `flawless visit would highly recommend the practice.`,
  },
  {
    name: "Zocdoc patient",
    source: "Zocdoc",
    rating: 5,
    services: ["comprehensive"],
    quote: `Wonderful staff, extremely thorough and professional staff!!`,
  },
];

/**
 * Interleave reviews 1:1 by source (Google, Zocdoc, Google, Zocdoc, ...) so any
 * top slice shows a balanced mix; once the shorter source runs out, the rest of
 * the longer source trails. Order within each source is preserved. Google leads
 * because it is the practice's primary proof surface (5.0 / 448).
 */
export function interleaveBySource(reviews: Review[]): Review[] {
  const google = reviews.filter((r) => r.source === "Google");
  const zocdoc = reviews.filter((r) => r.source === "Zocdoc");
  const out: Review[] = [];
  const max = Math.max(google.length, zocdoc.length);
  for (let i = 0; i < max; i++) {
    if (i < google.length) out.push(google[i]);
    if (i < zocdoc.length) out.push(zocdoc[i]);
  }
  return out;
}

// The exported, display-ready set: every real review, interleaved so any slice
// is a balanced 50/50 Google/Zocdoc mix when possible.
export const REVIEWS: Review[] = interleaveBySource([
  ...GOOGLE_REVIEWS,
  ...ZOCDOC_REVIEWS,
]);

// Headline proof numbers, sourced from the live public profiles.
export const REVIEW_STATS = {
  rating: 5.0,
  count: 448,
  source: "Google",
  zocdocRating: 4.91,
  zocdocCount: 396,
} as const;

// --- Helpers ---------------------------------------------------------------

const LABEL_BY_ID = new Map(SERVICE_META.map((s) => [s.id, s.label]));

/** Display label for a review's primary (first) service tag. */
export function primaryServiceLabel(review: Review): string {
  return LABEL_BY_ID.get(review.services[0]) ?? "Patient review";
}

/** Reviews that reference a given service, by canonical id. */
export function reviewsForService(id: ServiceId): Review[] {
  return REVIEWS.filter((r) => r.services.includes(id));
}

/** Reviews for a service page slug (e.g. "myopia-management"). */
export function reviewsForSlug(slug: string): Review[] {
  const meta = SERVICE_META.find((s) => s.slug === slug);
  return meta ? reviewsForService(meta.id) : [];
}

/** Service tags that actually have at least `min` reviews (for filter chips). */
export function populatedServices(min = 1): { id: ServiceId; label: string; count: number }[] {
  return SERVICE_META.map((s) => ({
    id: s.id,
    label: s.label,
    count: REVIEWS.filter((r) => r.services.includes(s.id)).length,
  })).filter((s) => s.count >= min);
}
