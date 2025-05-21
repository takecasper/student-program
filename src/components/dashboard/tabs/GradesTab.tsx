import { Card, CardContent } from '@/components/ui/card';
import { DownloadIcon } from '@radix-ui/react-icons';
import { Flag } from 'lucide-react';
import GradeCard from '../GradeCard';
import { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

type Trait = {
  label: string;
  value: number;
  color: string;
};

const traits: Trait[] = [
  { label: 'Leadership', value: 60, color: 'bg-[#FFD87C]' },
  { label: 'Self-Awareness', value: 80, color: 'bg-[#00A59B]' },
  { label: 'Collaboration', value: 40, color: 'bg-[#FA8D8F]' },
  { label: 'Communication', value: 80, color: 'bg-[#00A59B]' },
];

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  gradeCard: {
    marginBottom: 30,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  courseAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#d1d5dc',
    borderRadius: 20,
  },
  courseDetails: {
    gap: 4,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  courseDate: {
    fontSize: 10,
    color: '#6a7282',
  },
  yearGrades: {
    flexDirection: 'row',
    gap: 28,
  },
  yearGrade: {
    alignItems: 'center',
    gap: 4,
  },
  yearLabel: {
    fontSize: 10,
  },
  gradeValue: {
    fontSize: 10,
    fontWeight: 'bold',
    padding: '4 12',
    border: '1 solid #d1d5dc',
    borderRadius: 12,
  },
  courseData: {
    marginLeft: 56,
    marginTop: 24,
  },
  dataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 84,
  },
  dataColumn: {
    width: '40%',
  },
  dataTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    marginBottom: 10,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dataLabel: {
    fontSize: 12,
  },
  dataScore: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

// PDF Document Component
const GradesPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {Array.from({ length: 4 }).map((_, i) => (
        <View key={i} style={styles.gradeCard}>
          <View style={styles.cardHeader}>
            <View style={styles.courseInfo}>
              <View style={styles.courseAvatar} />
              <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>Neuroscience</Text>
                <Text style={styles.courseDate}>Mar 7, 2025 – May 2, 2025</Text>
              </View>
            </View>
            <View style={styles.yearGrades}>
              {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(year => (
                <View key={year} style={styles.yearGrade}>
                  <Text style={styles.yearLabel}>{year}</Text>
                  <Text style={styles.gradeValue}>88.00</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.courseData}>
            <View style={styles.dataGrid}>
              {['Assignments', 'iQuiz', 'Lab', 'Exams'].map(section => (
                <View key={section} style={styles.dataColumn}>
                  <Text style={styles.dataTitle}>{section}</Text>
                  {section !== 'Exams' ? (
                    ['1', '2', '3'].map(num => (
                      <View key={num} style={styles.dataItem}>
                        <Text style={styles.dataLabel}>
                          ↳ {section} {num}
                        </Text>
                        <Text style={styles.dataScore}>78.00</Text>
                      </View>
                    ))
                  ) : (
                    <>
                      <View style={styles.dataItem}>
                        <Text style={styles.dataLabel}>↳ Midterm Exam</Text>
                        <Text style={styles.dataScore}>78.00</Text>
                      </View>
                      <View style={styles.dataItem}>
                        <Text style={styles.dataLabel}>↳ Final Exam</Text>
                        <Text style={styles.dataScore}>78.00</Text>
                      </View>
                    </>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export function GradesTab() {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="w-full flex">
      {/* Grades Table with ScrollArea */}
      <Card className="border-none shadow-none bg-white w-2/3 rounded-none">
        <CardContent className="p-0 border-r pr-11 border-[#CCCCCC] rounded-none">
          <div className="flex justify-between mb-7 items-center">
            <h2 className="font-semibold uppercase text-sm">Undergraduate 2021–2025</h2>
            <PDFDownloadLink
              document={<GradesPDF />}
              fileName="grades-content.pdf"
              className={`cursor-pointer p-1 border border-[#3333331A] rounded-sm hover:bg-gray-50 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => setIsGenerating(true)}
              onLoad={() => setIsGenerating(false)}
            >
              {() => <DownloadIcon className="w-4 h-4 text-gray-400" />}
            </PDFDownloadLink>
          </div>
          <div
            id="grades-content"
            className="flex flex-col gap-8 text-sm font-sans h-[425px] text-[#1B1B1B] bg-[#fff] relative overflow-auto pr-4"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <GradeCard key={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Character Traits Card */}
      <Card className="shadow-none h-fit w-1/3 border-none">
        <CardContent className="p-0 pl-12">
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-gray-700 font-semibold text-sm">CHARACTER TRAITS</h3>
          </div>
          <div className="border rounded-xl p-5 space-y-6 shadow-sm">
            {traits.map(({ label, value, color }) => (
              <div key={label} className="space-y-1">
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <div className="relative w-full h-8 bg-white rounded-full border-[0.5px] border-[#CCCCCC] p-0.5">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full border-[0.5px] bg-white border-[#CCCCCC] p-0.5 flex items-center justify-center -ml-1 -mt-[1px]">
                    <div
                      className={`top-0 h-full w-full rounded-full flex items-center justify-center ${color}`}
                    >
                      <Flag className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
