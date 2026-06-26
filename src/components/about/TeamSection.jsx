import { team } from "../../data/team";
import TeamCard from "../common/TeamCard";
import SectionHeading from "../common/SectionHeading";

export default function TeamSection() {
  // Filter out team members with placeholder images from randomuser.me
  const coreTeam = team.filter(
    (member) => !member.image.includes("randomuser.me")
  );

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          subtitle="Our Experts"
          title="Meet Our Team"
          description="The dedicated professionals behind our success."
        />
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {coreTeam.map((member) => (
            <div key={member.id} className="w-full max-w-xs flex-shrink-0">
              <TeamCard {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}