import { motion } from "framer-motion";
import { Link } from "react-router";
const fadeUp = {
hidden: { opacity: 0, y: 40 },
visible: (i = 1) => ({
opacity: 1,
y: 0,
transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
}),
};
const WhyJoin = () => (
<section className="py-24 bg-linear-to-b from-[#12001f] to-black text-white">
<div className="max-w-6xl mx-auto px-6">
<motion.h2
initial="hidden"
whileInView="visible"
viewport={{ once: true }}
variants={fadeUp}
className="text-3xl md:text-4xl font-bold mb-12"
>
Why Join a Club?
</motion.h2>


<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{["Real Connections", "Skill Growth", "Exclusive Events"].map(
(title, i) => (
<motion.div
key={title}
custom={i}
initial="hidden"
whileInView="visible"
viewport={{ once: true }}
variants={fadeUp}
className="bg-[#0c0016] rounded-2xl p-6 shadow-lg"
>
<h3 className="text-xl font-semibold mb-3">{title}</h3>
<p className="text-gray-400 text-sm">
{title === "Real Connections" &&
"Meet people who genuinely share your interests."}
{title === "Skill Growth" &&
"Learn faster through group experiences."}
{title === "Exclusive Events" &&
"Access members-only meetups and workshops."}
</p>
</motion.div>
)
)}
</div>
</div>
</section>
);
export default WhyJoin;