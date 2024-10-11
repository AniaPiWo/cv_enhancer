import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Style dla dokumentu PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  experienceBlock: {
    marginBottom: 15,
  },
  contactInfo: {
    marginBottom: 15,
  },
  list: {
    marginLeft: 10,
  },
});

// Komponent dokumentu PDF
interface EnhancedCV {
  name: string;
  profession: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
  };
  bio: string;
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
  }[];
  soft_skills: string[];
  technologies: string[];
}

export const CVDocument = ({ enhancedCV }: { enhancedCV: EnhancedCV }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{enhancedCV.name}</Text>
        <Text style={styles.subHeader}>{enhancedCV.profession}</Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.subHeader}>Contact Information</Text>
        <Text style={styles.text}>Email: {enhancedCV.contact.email}</Text>
        <Text style={styles.text}>Phone: {enhancedCV.contact.phone}</Text>
        <Text style={styles.text}>LinkedIn: {enhancedCV.contact.linkedin}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Professional Summary</Text>
        <Text style={styles.text}>{enhancedCV.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Experience</Text>
        {enhancedCV.experience.map((exp, index) => (
          <View key={index} style={styles.experienceBlock}>
            <Text style={styles.text}>{exp.company}</Text>
            <Text style={styles.text}>{exp.position}</Text>
            <Text style={styles.text}>{exp.duration}</Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        {enhancedCV.education.map((edu, index) => (
          <View key={index} style={styles.experienceBlock}>
            <Text style={styles.text}>{edu.institution}</Text>
            <Text style={styles.text}>{edu.degree}</Text>
            <Text style={styles.text}>{edu.duration}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Skills</Text>
        <View style={styles.list}>
          {enhancedCV.soft_skills.map((skill, index) => (
            <Text key={index} style={styles.text}>
              • {skill}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Technologies</Text>
        <View style={styles.list}>
          {enhancedCV.technologies.map((tech, index) => (
            <Text key={index} style={styles.text}>
              • {tech}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ ...styles.text, fontSize: 8, marginTop: 20 }}>
          I consent to the processing of my personal data for the purposes
          necessary to carry out the recruitment process in accordance with
          GDPR.
        </Text>
      </View>
    </Page>
  </Document>
);

// Komponent przycisku do pobrania PDF
export const DownloadPDFButton = ({
  enhancedCV,
}: {
  enhancedCV: EnhancedCV;
}) => (
  <PDFDownloadLink
    document={<CVDocument enhancedCV={enhancedCV} />}
    fileName={`${enhancedCV.name.replace(" ", "_")}_CV.pdf`}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Download PDF
  </PDFDownloadLink>
);
