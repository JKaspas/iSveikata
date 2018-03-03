package lt.vtvpmc.ems.isveikata.prescription;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JpaPrescriptionRepository extends JpaRepository<Prescription, Long> {


    @Query(value = "SELECT * FROM PRESCRIPTION WHERE " +
            "patient_patient_id = ?1 ORDER BY EXPIRATION_DATE DESC " +
            "LIMIT ?2, ?3 ", nativeQuery = true)
    List<Prescription> findAllByPatientPatientId(String id, int from, int to);

//    SELECT * FROM PRESCRIPTION where PATIENT_PATIENT_ID  = 31202290012 and EXPIRATION_DATE > '2018-01-01'
    @Query("SELECT t FROM Prescription t WHERE " +
            "t.patient.patientId = :id AND  " +
            "t.expirationDate >= :date ")
    List<Prescription> findAllByPatientIdAndDateAfter(@Param("id")String id, @Param("date") Date date);
    
    @Query("SELECT p.api.id, count(*) FROM Prescription p JOIN p.prescriptionUsage pu GROUP BY p.api.id ORDER BY count(*) DESC")
    List<Object[]> getPublicApiStatistics(Pageable pageable);
    
	// SELECT API_ID, count(*) as usage, API.TITLE FROM PRESCRIPTION
	// JOIN PRESCRIPTION_USAGE ON PRESCRIPTION_ID = PRESCRIPTION.ID
	// JOIN API ON API.ID = API_ID
	// group by API_ID
	// order by usage desc
	// limit 10;
	//
	// SELECT API_ID, count(*) as usage FROM PRESCRIPTION
	// JOIN PRESCRIPTION_USAGE ON PRESCRIPTION_ID = PRESCRIPTION.ID
	// group by API_ID
	// order by usage desc
	// limit 15;
}

