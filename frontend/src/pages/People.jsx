import React from "react";
import PeopleProfile from "../components/PeopleProfile";

import { useAppContext } from "../context/AppProvider";

const People = () => {
  const { allUsers, allUsersAddress } = useAppContext();
  return (
    <div>
      <section className="py-6 bg-base-100">
        <div className="container flex flex-col justify-center p-4 mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {allUsers.map((person, index) => (
              <PeopleProfile
                key={index}
                name={person.username}
                role={person.jobDescription}
                location={person.location}
                image={person.cidProfilePhoto}
                userAddress={allUsersAddress[index]}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default People;
