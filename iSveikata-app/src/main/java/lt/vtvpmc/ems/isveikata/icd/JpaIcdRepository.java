package lt.vtvpmc.ems.isveikata.icd;

import lt.vtvpmc.ems.isveikata.patient.JpaPatientRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaIcdRepository extends JpaRepository<InternationalClassificationOfDiseases, String> {
}
