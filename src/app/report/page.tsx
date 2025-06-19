"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone } from "lucide-react";
const Report = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-3">Safety Resources in Pakistan</h1>
          <p className="text-gray-600 mb-4">
            Find below important resources, contacts, and information on where and how to report incidents of
            harassment, violence, and abuse. These resources are specific to Pakistan and organized by
            incident type to help you quickly access the help you need.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>In case of immediate danger:</strong> Dial <strong>15</strong> for Police Emergency or <strong>1122</strong> for Rescue Services.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="tel:15" className="block">
                <div className="border rounded-md p-4 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-lg mb-2">Police Emergency</h3>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold text-red-600 mb-1">15</p>
                    <Phone className="h-4 w-4 ml-2 text-red-600" />
                  </div>
                  <p className="text-gray-600 text-sm">Available 24/7 nationwide</p>
                  <p className="text-xs text-red-600 mt-2">Tap to call</p>
                </div>
              </a>
              <a href="tel:1122" className="block">
                <div className="border rounded-md p-4 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-lg mb-2">Rescue Services</h3>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold text-blue-600 mb-1">1122</p>
                    <Phone className="h-4 w-4 ml-2 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-sm">Available 24/7 nationwide</p>
                  <p className="text-xs text-blue-600 mt-2">Tap to call</p>
                </div>
              </a>
              <a href="tel:1099" className="block">
                <div className="border rounded-md p-4 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-lg mb-2">Ministry of Human Rights Helpline</h3>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold text-green-600 mb-1">1099</p>
                    <Phone className="h-4 w-4 ml-2 text-green-600" />
                  </div>
                  <p className="text-gray-600 text-sm">Toll-free helpline for legal advice on human rights violations</p>
                  <p className="text-xs text-green-600 mt-2">Tap to call</p>
                </div>
              </a>
              <a href="tel:1098" className="block">
                <div className="border rounded-md p-4 bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-lg mb-2">Madadgaar Helpline</h3>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold text-purple-600 mb-1">1098</p>
                    <Phone className="h-4 w-4 ml-2 text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-sm">National helpline for women and children</p>
                  <p className="text-xs text-purple-600 mt-2">Tap to call</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Report an Incident</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">At a Police Station</h3>
                <ol className="list-decimal ml-5 space-y-2">
                  <li>Visit your local police station or the nearest Women's Police Station if available.</li>
                  <li>Ask to file a First Information Report (FIR).</li>
                  <li>Provide all details of the incident, including date, time, location, and description.</li>
                  <li>Request a copy of the FIR for your records.</li>
                  <li>If the police refuse to file an FIR, you can approach the District Superintendent of Police or file a complaint at the local court.</li>
                </ol>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Note:</strong> Women's Police Stations are available in major cities to provide a safer environment for women to report crimes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Through Helplines</h3>
                <ul className="list-disc ml-5 space-y-2">
                  <li><strong><a href="tel:1099" className="text-safety-blue hover:underline">1099</a> (Ministry of Human Rights):</strong> Call to receive legal advice and referral services.</li>
                  <li><strong><a href="tel:1098" className="text-safety-blue hover:underline">1098</a> (Madadgaar):</strong> Call for guidance, counseling, and referrals specific to women and children.</li>
                  <li><strong><a href="tel:03041111741" className="text-safety-blue hover:underline">0304-111-1741</a> (Rozan Counseling Helpline):</strong> Available Monday to Friday, 9:30 am – 5:00 pm.</li>
                  <li><strong><a href="tel:080022444" className="text-safety-blue hover:underline">0800-22-444</a> (Rozan Toll-Free):</strong> Free counseling services for emotional support.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Online Reporting Options</h3>
                <ul className="list-disc ml-5 space-y-2">
                  <li><strong>Email to Ministry of Human Rights:</strong> <a href="mailto:helpline@mohr.gov.pk" className="text-safety-blue hover:underline">helpline@mohr.gov.pk</a></li>
                  <li><strong>Email to Rozan:</strong> <a href="mailto:helpline@rozan.org" className="text-safety-blue hover:underline">helpline@rozan.org</a></li>
                  <li>Some police departments in major cities have online FIR filing systems on their websites.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Women's Police Stations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Women's Police Stations are specialized units staffed by female officers, designed to provide a safe environment for women to report crimes.</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Islamabad</h3>
                  <p className="text-gray-600">F-8 Markaz, Islamabad</p>
                  <p className="text-gray-600"><a href="tel:0519261163" className="text-safety-blue hover:underline flex items-center"><span>051-9261163</span><Phone className="h-3 w-3 ml-1" /></a></p>
                </div>
                <div>
                  <h3 className="font-medium">Lahore</h3>
                  <p className="text-gray-600">Empress Road, Lahore</p>
                  <p className="text-gray-600"><a href="tel:04299205627" className="text-safety-blue hover:underline flex items-center"><span>042-99205627</span><Phone className="h-3 w-3 ml-1" /></a></p>
                </div>
                <div>
                  <h3 className="font-medium">Karachi</h3>
                  <p className="text-gray-600">Aram Bagh, Karachi</p>
                  <p className="text-gray-600"><a href="tel:02199217267" className="text-safety-blue hover:underline flex items-center"><span>021-99217267</span><Phone className="h-3 w-3 ml-1" /></a></p>
                </div>
                <div>
                  <h3 className="font-medium">Peshawar</h3>
                  <p className="text-gray-600">Gulbahar Police Station, Peshawar</p>
                  <p className="text-gray-600"><a href="tel:0919213762" className="text-safety-blue hover:underline flex items-center"><span>091-9213762</span><Phone className="h-3 w-3 ml-1" /></a></p>
                </div>
                <div>
                  <h3 className="font-medium">Quetta</h3>
                  <p className="text-gray-600">Jinnah Road, Quetta</p>
                  <p className="text-gray-600"><a href="tel:0819202484" className="text-safety-blue hover:underline flex items-center"><span>081-9202484</span><Phone className="h-3 w-3 ml-1" /></a></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Women's Shelters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Women's shelters provide temporary accommodation, legal aid, and counseling services to women facing domestic violence or other forms of abuse.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Dastak (Lahore)</h3>
                  <p className="text-gray-600">Crisis Helpline: <a href="tel:03334161610" className="text-safety-blue hover:underline flex items-center inline-flex"><span>0333-4161610</span><Phone className="h-3 w-3 ml-1" /></a></p>
                  <p className="text-gray-600">Available Mon-Sat from 9 am to 5 pm</p>
                  <p className="text-gray-600">Services: Shelter, legal aid, counseling, and rehabilitation</p>
                </div>
                <div>
                  <h3 className="font-medium">PANAH (Karachi)</h3>
                  <p className="text-gray-600"><a href="tel:02135373008" className="text-safety-blue hover:underline flex items-center inline-flex"><span>021-35373008</span><Phone className="h-3 w-3 ml-1" /></a></p>
                  <p className="text-gray-600">Services: Shelter, legal aid, skills training</p>
                </div>
                <div>
                  <h3 className="font-medium">Dar-ul-Aman (Government Shelters)</h3>
                  <p className="text-gray-600">Available in most districts of Pakistan</p>
                  <p className="text-gray-600">Services: Temporary shelter, legal aid, medical treatment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Support Resources by Incident Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Domestic Violence</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>
                      Domestic violence includes physical, emotional, sexual, and economic abuse perpetrated by a family member.
                    </p>

                    <div>
                      <h4 className="font-medium">Where to Report:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>Local Police Station or Women's Police Station</li>
                        <li>Call <a href="tel:1099" className="text-safety-blue hover:underline">1099</a> Ministry of Human Rights Helpline</li>
                        <li>Call <a href="tel:03334161610" className="text-safety-blue hover:underline">0333-4161610</a> (Dastak Crisis Helpline)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Specialized Support Services:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li><strong>Rozan Women's Program (Zeest):</strong> Call <a href="tel:03041111741" className="text-safety-blue hover:underline">0304-111-1741</a> for counseling</li>
                        <li><strong>Gender-Based Violence Crisis Line:</strong> <a href="tel:03355000407" className="text-safety-blue hover:underline">0335-5000407</a> (Monday to Friday, 9:30 am – 5:00 pm)</li>
                        <li><strong>Aurat Foundation:</strong> Islamabad (<a href="tel:0512608956" className="text-safety-blue hover:underline">051-2608956</a>), Lahore (<a href="tel:04235959027" className="text-safety-blue hover:underline">042-35959027</a>), Karachi (<a href="tel:02135824694" className="text-safety-blue hover:underline">021-35824694</a>)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Legal Framework:</h4>
                      <p>
                        The Protection Against Harassment of Women at the Workplace (Amendment) Act, 2022 and various provincial Domestic Violence Prevention Acts provide legal protection.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Sexual Harassment and Assault</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>
                      Sexual harassment includes unwelcome sexual advances, requests for sexual favors, and other verbal or physical conduct of a sexual nature.
                    </p>

                    <div>
                      <h4 className="font-medium">Where to Report:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>Local Police Station or Women's Police Station</li>
                        <li>Call <a href="tel:1099" className="text-safety-blue hover:underline">1099</a> Ministry of Human Rights Helpline</li>
                        <li>File a complaint with the Federal Ombudsman if it occurs at the workplace</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Specialized Support Services:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li><strong>War Against Rape (Karachi):</strong> <a href="tel:02135373008" className="text-safety-blue hover:underline">021-35373008</a></li>
                        <li><strong>Bedari (Islamabad/Rawalpindi):</strong> <a href="tel:0512850906" className="text-safety-blue hover:underline">051-2850906</a></li>
                        <li><strong>Aahung (Karachi):</strong> <a href="tel:03072747074" className="text-safety-blue hover:underline">0307-2747074</a></li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Medical Care:</h4>
                      <p>
                        It's important to seek medical care as soon as possible after an assault. Government hospitals are required to provide medical examination and treatment.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Forced Marriage</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>
                      Forced marriage is when one or both people do not consent to the marriage and pressure or abuse is used.
                    </p>

                    <div>
                      <h4 className="font-medium">Where to Report:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>Local Police Station</li>
                        <li>Call 1099 Ministry of Human Rights Helpline</li>
                        <li>File a petition in Family Court</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Specialized Support Services:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li><strong>Chayn Pakistan:</strong> Visit chaynpakistan.org for resources on forced marriage</li>
                        <li><strong>Dastak:</strong> 0333-4161610 for legal aid and shelter</li>
                        <li><strong>Lawyers for Human Rights and Legal Aid:</strong> 021-5685824</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Legal Framework:</h4>
                      <p>
                        The Prevention of Anti-Women Practices Act, 2011 criminalizes forced marriage and child marriage.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Online Harassment</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>
                      Online harassment includes cyberstalking, revenge porn, online threats, and other forms of digital abuse.
                    </p>

                    <div>
                      <h4 className="font-medium">Where to Report:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>Federal Investigation Agency (FIA) Cybercrime Wing: +92-51-9106384</li>
                        <li>Online complaint: https://www.fia.gov.pk/en/crime_categories</li>
                        <li>National Response Centre for Cyber Crime (NR3C)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Specialized Support Services:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li><strong>Digital Rights Foundation Cyber Harassment Helpline:</strong> 0800-39393 (Toll-free)</li>
                        <li><strong>Chayn Pakistan:</strong> Visit chaynpakistan.org for resources on online safety</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Legal Framework:</h4>
                      <p>
                        The Prevention of Electronic Crimes Act, 2016 criminalizes various forms of online harassment.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Child Abuse</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>
                      Child abuse includes physical, emotional, sexual abuse, and neglect of children under 18 years of age.
                    </p>

                    <div>
                      <h4 className="font-medium">Where to Report:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>Local Police Station</li>
                        <li>Call 1098 Madadgaar Helpline</li>
                        <li>Call 1099 Ministry of Human Rights Helpline</li>
                        <li>Child Protection Bureau in your province</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Specialized Support Services:</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li><strong>Sahil:</strong> 0800-13518 (Toll-free)</li>
                        <li><strong>Child Protection & Welfare Bureau:</strong> 1121</li>
                        <li><strong>Rozan's Children's Program (Aangan):</strong> 0304-111-1741</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Legal Framework:</h4>
                      <p>
                        The Zainab Alert, Response and Recovery Act, 2020 and The Islamabad Capital Territory Child Protection Act, 2018 provide legal protection for children.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal Aid Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p>
                Legal aid organizations provide free or low-cost legal assistance to those who cannot afford legal representation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">AGHS Legal Aid Cell</h3>
                  <p className="text-gray-600 mb-2">Provides free legal aid for women and children</p>
                  <p className="text-sm"><strong>Contact:</strong> 042-37222774</p>
                  <p className="text-sm"><strong>Address:</strong> 141-Scotch Corner, Upper Mall, Lahore</p>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Lawyers for Human Rights and Legal Aid (LHRLA)</h3>
                  <p className="text-gray-600 mb-2">Provides free legal assistance and counseling</p>
                  <p className="text-sm"><strong>Contact:</strong> 021-5685824, 021-5219902</p>
                  <p className="text-sm"><strong>Address:</strong> D-1, 1st Floor, Court View Apartments, Karachi</p>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Women Aid Trust</h3>
                  <p className="text-gray-600 mb-2">Team of lawyers operating in major cities</p>
                  <p className="text-sm"><strong>Cities:</strong> Rawalpindi, Islamabad, Peshawar, Lahore, Multan, Karachi</p>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Legal Advisory Call Centre (Sindh)</h3>
                  <p className="text-gray-600 mb-2">Telephone legal advice service</p>
                  <p className="text-sm"><strong>Contact:</strong> 021-35809349</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mental Health Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Traumatic experiences can have a significant impact on mental health. The following resources provide mental health support:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Rozan Counseling Helpline</h3>
                <p className="text-gray-600"><strong>Phone:</strong> 0304-111-1741 (Regular charges)</p>
                <p className="text-gray-600"><strong>Toll-Free:</strong> 0800-22-444</p>
                <p className="text-gray-600"><strong>Email:</strong> helpline@rozan.org</p>
                <p className="text-gray-600"><strong>Hours:</strong> Monday to Friday, 9:30 am – 5:00 pm</p>
              </div>

              <div>
                <h3 className="font-medium">Pakistan Association for Mental Health</h3>
                <p className="text-gray-600"><strong>Phone:</strong> 021-34539239</p>
                <p className="text-gray-600"><strong>Address:</strong> C-53, Block 1, Main Clifton Road, Karachi</p>
              </div>

              <div>
                <h3 className="font-medium">Institute of Clinical Psychology, University of Karachi</h3>
                <p className="text-gray-600"><strong>Phone:</strong> 021-99261300</p>
              </div>

              <div>
                <h3 className="font-medium">Aga Khan University Hospital Psychiatry Department</h3>
                <p className="text-gray-600"><strong>Phone:</strong> 021-34930051</p>
                <p className="text-gray-600"><strong>Address:</strong> Stadium Road, Karachi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Reporting FAQs</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">What happens after I report an incident to the police?</h3>
                  <p className="text-gray-600">
                    After filing an FIR, the police are required to investigate the case. This includes collecting evidence, recording statements, and possibly making arrests. The case will then be presented to a prosecutor who decides whether to take it to court.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">What if the police refuse to register my complaint?</h3>
                  <p className="text-gray-600">
                    If the police refuse to register your FIR, you can approach the Superintendent of Police (SP) or District Police Officer (DPO). You can also file a complaint directly with a magistrate under Section 200 of the Criminal Procedure Code, which can direct the police to investigate.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Is my information kept confidential?</h3>
                  <p className="text-gray-600">
                    Yes, all helplines and support services maintain confidentiality. However, in cases where court proceedings are necessary, certain information may need to be disclosed. Shelters and counseling services strictly maintain client confidentiality.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">How long does the legal process take?</h3>
                  <p className="text-gray-600">
                    The legal process can vary significantly depending on the nature of the case. Some cases may be resolved in months, while others can take years. Legal aid organizations can provide guidance on the expected timeline for your specific case.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Can I get protection if I fear for my safety?</h3>
                  <p className="text-gray-600">
                    Yes, you can request a protection order from the court. Women's shelters also provide temporary safe accommodation. In immediate danger situations, contact emergency services (15 for Police, 1122 for Rescue).
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-center">
          <a
            href="https://chaynpakistan.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <Button variant="outline" className="mr-4">
              <span className="mr-2">Visit Chayn Pakistan for More Resources</span>
              <ExternalLink size={16} />
            </Button>
          </a>
          <a
            href="https://www.mohr.gov.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <Button variant="outline">
              <span className="mr-2">Ministry of Human Rights</span>
              <ExternalLink size={16} />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Report; 