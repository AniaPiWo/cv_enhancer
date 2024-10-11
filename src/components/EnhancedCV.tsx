import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { DownloadPDFButton } from "./PDFGenerator";

interface EnhancedCVDisplayProps {
  enhancedCV: any;
  onChange: (field: string, value: any) => void;
}

const EnhancedCVDisplay: React.FC<EnhancedCVDisplayProps> = ({
  enhancedCV,
  onChange,
}) => {
  if (!enhancedCV) {
    return <p></p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded ">
      <DownloadPDFButton enhancedCV={enhancedCV} />

      <form className=" p-4 bg-white rounded shadow-sm text-start">
        {/* Render individual properties */}
        <div className="mb-4">
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            value={enhancedCV.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Profession:</label>
          <input
            type="text"
            value={enhancedCV.profession}
            onChange={(e) => onChange("profession", e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Bio:</label>
          <textarea
            value={enhancedCV.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            rows={4}
          />
        </div>

        {/* Render contact information */}
        <h3 className="font-medium mt-4">Contact:</h3>
        <div className="mb-4">
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            value={enhancedCV.contact.email}
            onChange={(e) => onChange("contact.email", e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Phone:</label>
          <input
            type="text"
            value={enhancedCV.contact.phone}
            onChange={(e) => onChange("contact.phone", e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">LinkedIn:</label>
          <input
            type="text"
            value={enhancedCV.contact.linkedin}
            onChange={(e) => onChange("contact.linkedin", e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Render skills as a list */}
        <h3 className="font-medium mt-4">Soft Skills:</h3>
        {enhancedCV.soft_skills.map((skill: string, index: number) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => onChange(`soft_skills.${index}`, e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        ))}

        {/* Render technologies as a list */}
        <h3 className="font-medium mt-4">Technologies:</h3>
        {enhancedCV.technologies.map((tech: string, index: number) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={tech}
              onChange={(e) =>
                onChange(`technologies.${index}`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        ))}

        {/* Render languages */}
        <h3 className="font-medium mt-4">Languages:</h3>
        <div className="mb-4">
          <label className="block font-medium">Native Language:</label>
          <input
            type="text"
            value={enhancedCV.native_language}
            onChange={(e) => onChange("native_language", e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        {enhancedCV.languages.map((lang: string, index: number) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={lang}
              onChange={(e) => onChange(`languages.${index}`, e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        ))}

        {/* Render experience as a list */}
        <h3 className="font-medium mt-4">Experience:</h3>
        {enhancedCV.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <label className="block font-medium">Company:</label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) =>
                onChange(`experience.${index}.company`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
            <label className="block font-medium mt-2">Position:</label>
            <input
              type="text"
              value={exp.position}
              onChange={(e) =>
                onChange(`experience.${index}.position`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
            <label className="block font-medium mt-2">Duration:</label>
            <input
              type="text"
              value={exp.duration}
              onChange={(e) =>
                onChange(`experience.${index}.duration`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
            <label className="block font-medium mt-2">Description:</label>
            <textarea
              value={exp.description}
              onChange={(e) =>
                onChange(`experience.${index}.description`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        ))}

        {/* Render education as a list */}
        <h3 className="font-medium mt-4">Education:</h3>
        {enhancedCV.education.map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <label className="block font-medium">Institution:</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) =>
                onChange(`education.${index}.institution`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
            <label className="block font-medium mt-2">Degree:</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) =>
                onChange(`education.${index}.degree`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
            <label className="block font-medium mt-2">Duration:</label>
            <input
              type="text"
              value={edu.duration}
              onChange={(e) =>
                onChange(`education.${index}.duration`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        ))}

        {/* Render projects as a list */}
        <h3 className="font-medium mt-4">Projects:</h3>
        {enhancedCV.projects.map((project: any, index: number) => (
          <div key={index} className="mb-4">
            <label className="block font-medium">Project Name:</label>
            <input
              type="text"
              value={project.name}
              onChange={(e) =>
                onChange(`projects.${index}.name`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
            <label className="block font-medium mt-2">Description:</label>
            <textarea
              value={project.description}
              onChange={(e) =>
                onChange(`projects.${index}.description`, e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        ))}
        <div className="flex flex-col gap-4">
          <p>
            Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb
            niezbędnych do realizacji procesu rekrutacji zgodnie z
            Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia
            27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z
            przetwarzaniem danych osobowych i w sprawie swobodnego przepływu
            takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).
          </p>
          <p>
            I consent to the processing of my personal data for the purposes
            necessary to carry out the recruitment process in accordance with
            Regulation (EU) 2016/679 of the European Parliament and of the
            Council of 27 April 2016 on the protection of natural persons with
            regard to the processing of personal data and on the free movement
            of such data, and repealing Directive 95/46/EC (GDPR).
          </p>
        </div>
      </form>
    </div>
  );
};

export default EnhancedCVDisplay;
