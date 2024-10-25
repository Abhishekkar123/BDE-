import React from 'react';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';

const AgreementForm = () => {
  return (
    <Container>
      <h4 className="text-center mb-4">The following Agreement is concluded</h4>
      <h5 className="text-center mb-4">Between</h5>

      <Table bordered>
        <tbody>
          <tr>
            <td>
              <strong>INDIAN REGISTER QUALITY SYSTEMS</strong><br />
              (A Division of IRCLASS Systems and Solutions Private Limited)
            </td>
            <td className="text-center">And</td>
            <td className="text-center">Herein after referred to as the Client</td>
          </tr>
          <tr>
            <td>
              Herein after referred to as <strong>IRQS</strong>, whose office is located at<br />
              52 A, Adi Shankarcharya Marg, Opp. Powai Lake, Powai, Mumbai - 400 072<br />
              Web: www.irclass.org e-mail: irqs@irclass.org
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>

      <p>
        Client shall offer their management system for the audit to IRQS as per the following standard/s:
      </p>

      <Table bordered>
        <tbody>
          <tr>
            <td><strong>1 Standard/Product</strong></td>
            <td>:</td>
          </tr>
          <tr>
            <td><strong>2 Scope of Assessment / Product Certified</strong><br />
              <span style={{ color: 'red', fontSize: 'small' }}>
                [Note: a. Initial Scope as per Contract Review and/or b) As per issued 'Certificate of Approval']
              </span>
            </td>
            <td>:</td>
          </tr>
          <tr>
            <td><strong>3 Location/s</strong><br />
              <span style={{ color: 'red', fontSize: 'small' }}>
                [List of all site Locations with the scope of certification].<br />
                If space is insufficient, can attach additional sheet.
              </span>
            </td>
            <td>:</td>
          </tr>
        </tbody>
      </Table>

      <p>
        4 Client agrees to provide IRQS with all documents, information and facilities to carry out their assignment and agree to pay the fees as detailed in IRQS letter No. ______ dated _______. The total order value for 3 years is _________ with/without (strike out whichever is not applicable) Traveling & Incidental Expenses.
      </p>

      <p style={{ fontSize: 'small' }}>
        <strong>*Note: Traveling & Incidental Expenses:</strong><br />
        In addition to the charges mentioned, travelling, incidental expenses will be charged extra at actual. These expenses include Air Fare, A/C Rail fare, suitable hotel accommodation and local travel expenses relating to the audits.
      </p>

      <p className='mt-3'>5. It is understood that both IRQS and Client will treat as strictly confidential and will not disclose to any third party without prior written consent of the other, any Information which comes into their possession, the possession of their employees, agents or others by virtue of IRQS undertaking this assessment</p>
    <p className='mt-3'>6.  Please note the Certificate will be released by IRQS subjected to no outstanding of payment.
    </p>

    
    <p className='mt-3'>7.  Client agrees to the terms & conditions stated in this Agreement for IRQS to undertake this assessment.</p>
    <div style={{ margin: '20px' }}>
      <Table bordered>
        <thead>
          <tr>
            <th style={{width:'40%'}}>Name of the Organization</th>
            <th></th>
            <th style={{width:'40%'}}>IRQS (A Div. of ISSPL)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name of Representative</td>
            <td></td>
            <td>Name</td>
            <td></td>
          </tr>
          <tr>
            <td>Signature & Date</td>
            <td></td>
            <td>Signature & Date</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>

    <h2>Terms & Conditions</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Section</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {/* Section 1: Responsibility of IROQS */}
          <tr>
            <td><strong>1.0</strong></td>
            <td>
              <strong>Responsibility of IROQS</strong><br />
              It is the responsibility of IRQS to provide Assessment and Certification in accordance with the current issue of IRQS Document “Certification Scheme”.  Please note that in meeting its Policy of continual improvement of service, IRQS reserves the right to modify the contents of “Certification Scheme”.
            </td>
          </tr>

          {/* Section 2: Responsibility of Auditee Organization */}
          <tr>
            <td><strong>2.0</strong></td>
            <td>
              <strong>Responsibility of Auditee Organization</strong><br />
                2.1 It is the responsibility of the organisation to provide IRQS with all documents, information, facilities and changes as, when it takes place and undertake the audit as per the determined mandays to enable IRQS to provide the services under these terms and conditions.<br/>
                2.2	It is the responsibility of the organisation to provide accreditation bodies of IRQS with all documents, information and visits as necessary to enable verification of audits carried out by IRQS.<br/>
                2.3	It is the responsibility of Client Organization to visit IRCLASS/IRQS website www.irqs.co.in on the updation of the Certification Scheme. <br/>
                2.4 Based on concerns noticed during the office assessment / market feedback / complaints Director, NABCB may decide to arrange visits to certified organizations. IRQS shall, in their contract with their clients provide for such visits. IRQS shall be informed of any such validation visits and may join the NABCB assessor on such visits if required. IRQS would be informed of the duration of such visits and the information planned to be collected. For the present NABCB would bear the cost related to such validation visits.<br/>
                2.5 IRQS may opt for such validation visits in lieu of witnessing on their own. In such cases the number of validation visits required, duration and charges to be levied would be communicated to the IRQS by NABCB secretariat in advance for acceptance. Selection of samples would be done by NABCB Secretariat.<br/>
                2.6 If Accreditation Bodies or IRQS identified the Organization for Witness assessment along with the accreditation or otherwise or independently by accreditation body, client organization shall offer themselves for the witness. In case client organization refuses to undertake these witness assessments, in such cases the granted certificate “Certificate of Approval” shall be withdrawn with immediate effect.<br/>
                2.4	Independently from the involvement of the competent regulatory authority, if necessary IRQS may conduct a special audit in case of a serious incident related to occupational health and safety, for example, a serious accident, or a serious breach of regulation, in order to investigate if the management system has not been compromised and did function effectively. IRQS shall document the outcome of its investigation. <br/>
                2.5	Information on environmental, occupational health, illness, injuries, security, product failures, incidents such as a serious accident, or a serious breach of regulation necessitating the involvement of the competent regulatory authority, provided by the certified client or directly gathered by the audit team during the special audit, shall provide grounds for IRQS to decide on the actions to be taken, including a suspension or withdrawal of the certification, in cases where it can be demonstrated that the system seriously failed to meet the OH&S certification requirements.<br/> 
                2.6	It is the responsibility of the organization to ensure the safety of IRQS team during the audit process onsite. To provide relevant PPE’s including Safety Shoes, Hard hat (Helmet), Respiratory protective equipment, any other relevant PPE’s as applicable & identified by the organization to prevent injury and ill health.<br/>
                2.7	For Medical Devices : The certified client has no objection in authorizing the release of the Audit report information to the regulator that recognizes ISO 13485.<br/>
                2.8	Making availability of facility of conduct of Remote audit as applicable,  for verifying audit objectives, during Remote audit carried out using ICT facility for gathering the audit evidences by utilizing the computer-assisted techniques such as MS Team, Skype, Video conferencing, webinar, information available in soft etc. as applicable.<br/>
                2.9	If the organization has not undertaken the recertification audit or IRQS is unable to verify the implementation of corrections and corrective actions for any major nonconformity prior to the expiry date of the certification taken by organization due the failure of organization, then recertification shall not be recommended and the validity of the certification shall not be extended. Certificate remains Expired.<br/>
                2.10 Any changes in organization for example:  changes relating to:<br/>
                     a. the legal, commercial, organizational status or ownership;   b) organization and management (e.g. key managerial, decision-making or technical staff ); c) contact address and sites;  d) scope of operations under the certified management system; e) major changes to the management system and processes. If not communicated to IRQS, liability arising due to that will on the certified client.

            </td>
          </tr>
          <tr>
          <td><strong>3.0</strong></td>
          <td>
           <strong>3.0	Fees & Expenses</strong>
           3.1	For agreements under Tender Documents: All terms & conditions will be applicable as per agreed tender documents.
            3.2	The fees payable and terms of payment are as detailed in IRQS letter enclosing the quotation to the organisation.  The basic charges for services requested are based on the assumption that the information supplied by the organisation was accurate and complete.<br/>
            3.3	Repeat Stage 1, Follow-up audit Full or Part (Stage 2, Re-certification, Surveillance) Special Audit (Expanding scope of certification already granted, Short notice audit or unannounced to investigate complaints or in response to changes or follow-up for revocation of suspension.<br/>
            3.4	All the repeat stage 1, follow-up & special audit will be charged as per prevalent fees applicable at that time.<br/>
            3.5	Travel and Incidental Expenses<br/>
            All fees are exclusive of travel and incidental expenses which will be charged extra at actuals.<br/>
            3.6	Postponement – (Recovery of Administrative Costs) : In case a scheduled audit is postpone, at the behest of the auditee, an amount of 10% of the total Audit and Certification fee, shall be charged – for each of such alterations – towards Administrative charges.<br/>
            3.7	Cancellation – (Recovery of Administrative Costs) : The application fees/administrative charges as mentioned in Annexue-1 of our quotation for Certification Services, shall be payable in advance, prior to scheduling of the audit.  In case of cancellation of audit by the auditee, these application fees/ administrative charges will not be refunded.<br/>
            3.8	Statutory Taxes : All fees and expenses quoted are exclusive of any statutory taxes which will be charged at the current rate, if applicable.<br/>
            3.9	Invoices : Invoices will be submitted as soon as practicable, after the completion of any assessment visit(s).  As IRQS is a division of IRCLASS Systems and Solutions Private Limited, the invoices would be as per  IRCLASS Systems and Solutions Private Limited  invoice format.<br/>
            3.10	Payment : All payments should be made in the name of “IRCLASS Systems and Solutions Private Limited” preferably by local cheque/demand draft within 7 days of receipt of the invoice.  Amounts remaining unpaid for more than 30 days from invoice date will be liable to interest at the rate of 15% per annum.<br/>
            The Certificate(s) of Approval cannot be released until full payment has been received by IRCLASS Systems and Solutions Private Limited.<br/>
            3.11	If the payment for Audit is not made within 6 months from the date of Invoice then the Certificate shall be put under the Suspension & subsequently withdrawn as per suspension/withdrawal procedure


          </td>


          </tr>
          <tr>
            <td>
            <strong>4.0</strong> 
            </td>
            <td>
            <strong>4.0	Termination</strong>
            Either party may terminate this request for assessment:-<br/>
4.1	By Notice<br/>
4.1.1  Three months written notice may be given by either party to the other.<br/>
4.2	By default<br/>
4.2.1  Immediately upon either party being notified by the other of any material breach of this request for assessment.<br/>
4.2.2  If either party goes into liquidation or a receiver or administrator is appointed for all or part of the undertaking thereof.<br/>

In the event of request for assessment being terminated whether by notice, default or otherwise the IRQS Certificate of Approval issued pursuant hereto shall forthwith become invalid and the Supplier shall cease to use the same and return to IRQS all documentation<br/>

            </td>
          </tr>
          <tr>
            <td> <strong>5.0</strong> </td>
            <td>
            <strong>5.0	Fundamental Term</strong> 
            5.1	Organisation whereby warrants and covenants with IRQS that it will at all times during the subsistence of these terms and conditions comply with all reasonable requirements necessary for the issuance of the Certificate of Approval including (but without prejudice to the generality thereof) all statutes, rules, regulations issued by any statutory or any other competent authority, all recommendations, codes and similar matters issued by any authority, pursuant to which or in compliance of which or for the purpose of which the Certificate of Approval is issued or such other reasonable requirements of IRQS as are necessary to enable the Certificate of Approval to be issued and maintained in force in conformity with standards of high quality of certification.<br/>
            5.2    The organization hereby warrants the completeness and accuracy of all documents and accuracy of all information supplied to IRQS for the purposes of these terms & conditions for assessment.

            </td>
          </tr>
          <tr>
          <td> <strong>6.0</strong> </td>   
          <td>
            <strong>6.0	Certificates and Use of Logo(s) and Complaints Procedure    </strong>
            6.1	Upon successful completion of Initial Assessment IRQS shall issue Certificate(s) of Approval to the organisation detailing the quality Standard(s) to which assessment was made, declaring the scope of supply. The Certificate(s) of approval is/are valid for a period of three years from the date of issue subject to satisfactory maintenance of the quality systems through surveillance audits.<br/>
            6.2	Certification under this scheme does not imply certification of the organization’s product or service and does not therefore exempt him from his legal obligations.<br/>
            Organization to conforms to the requirements of  IRQS when making reference to its certification :<br/>
            a)	status in communication media such as the internet, brochures or advertising, or other documents;<br/>
            b) does not make or permit any misleading statement regarding its certification;<br/>
            c) does not use or permit the use of a certification document or any part thereof in a misleading manner;<br/>
            d) upon withdrawal of its certification, discontinues its use of all advertising matter that contains a reference to certification, as directed by IRQS and as referred in II IRQS OPM 19 are applicable to abide by.<br/>
            e) amends all advertising matter when the scope of certification has been reduced;<br/>
            f) does not allow reference to its management system certification to be used in such a way as to imply that the IRQS certifies a product (including service) or process;<br/>
            g) does not imply that the certification applies to activities and sites that are outside the scope of certification;<br/>
            h) does not use its certification in such a manner that would bring the certification body and/or certification system into disrepute and lose public trust.<br/>
                        4.3          a) The use of IATF logotype as displayed in the certificate issued by IRQS should not be reproduced in isolation elsewhere.<br/>
                b) For details of LOGO Usage, kindly refer III IRQS: OPM:19 supplemented with the ‘Certificate of Approval’.<br/>
            6.3	 The organisation undertakes to institute a system of registering all complaints received from any source.  The corrective action(s) taken and review by Organisation Management of such actions shall be made available for verification. They will inform that the complainant can also write to IRQS.

          </td>

          </tr>
          <tr>
            <td>
                <strong>7.0</strong>
            </td>
            <td>
               <strong>	Liability</strong><br/>
               7.1	Whilst IRCLASS Systems and Solutions Private Limited and its Committees use their best endeavors to ensure that the functions of  IRCLASS Systems and Solutions Private Limited  are properly carried out, in providing services information or advice neither  IRCLASS Systems and Solutions Private Limited  nor any of its employees or agents warrants the accuracy of any information supplied.  Except as set our herein neither  IRCLASS Systems and Solutions Private Limited  nor any of its employees or agents (on behalf of each of whom  IRCLASS Systems and Solutions Private Limited  has agreed this clause) shall be liable for any loss damage or expense whatsoever sustained by any client organization due to any act or omission or error of whatsoever nature and howsoever caused by  IRCLASS Systems and Solutions Private Limited , its employees or agents or due to any inaccuracy of whatsoever nature and howsoever caused in any information or opinion given in any way whatsoever by or on behalf of  IRCLASS Systems and Solutions Private Limited , even if held to amount to a breach of warranty.  Nevertheless, if any client organization uses services of  IRCLASS Systems and Solutions Private Limited , or relies on any information or advice given by or on behalf or  IRCLASS Systems and Solutions Private Limited  and suffers loss damage or expenses thereby which is proved to have been due to any negligent act omission or error of  IRCLASS Systems and Solutions Private Limited, proved in a court of law or related jurisdiction its employees or agents or any negligent inaccuracy in information or opinion given by or on behalf of  IRCLASS Systems and Solutions Private Limited  then  IRCLASS Systems and Solutions Private Limited  will pay compensation to the client organization for his proved loss up to but not exceeding the amount of the fee charged by  IRCLASS Systems and Solutions Private Limited  for that particular service, information or opinion.

            </td>
          </tr>
          <tr>
             <td><strong>8.0</strong></td>
             <td>
                <strong>	Indemnity</strong>
                8.1	The Organisation shall fully and effectually indemnify IRCLASS Systems and Solutions Private Limited  agents all costs, claims, actions and demands arising from:<br/>
(i)	the service provided by  IRCLASS Systems and Solutions Private Limited  save to the extent only that such claims arise from the neglect of  IRCLASS Systems and Solutions Private Limited , its employees or agents.<br/>
(ii)	the misuse by the organization of any certificate, license, mark of conformity provided by IRQS in accordance with these terms & conditions.<br/>
(iii)	any breach of these terms & conditions.

             </td>

          </tr>
          
        </tbody>
      </Table>
    
    </Container>
  );
};

export default AgreementForm;
