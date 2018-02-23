package lt.vtvpmc.ems.isveikata.prescription;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface JpaPrescriptionRepository extends JpaRepository<Prescription, Long> {

    Page<Prescription> findAllByPatientPatientId(String id, Pageable pageable);

//    SELECT * FROM PRESCRIPTION where PATIENT_PATIENT_ID  = 31202290012 and EXPIRATION_DATE > '2018-01-01'
    @Query("SELECT t FROM Prescription t WHERE " +
            "t.patient.patientId = :id AND  " +
            "t.expirationDate >= :date ")
    Page<Prescription> findAllByPatientIdAndDateAfter(@Param("id")String id, @Param("date") Date date, Pageable pageable);
}

