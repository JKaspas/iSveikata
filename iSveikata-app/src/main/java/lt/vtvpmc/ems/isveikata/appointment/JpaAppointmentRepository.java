package lt.vtvpmc.ems.isveikata.appointment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaAppointmentRepository extends JpaRepository<Appointment, Long> {
	
	
}
