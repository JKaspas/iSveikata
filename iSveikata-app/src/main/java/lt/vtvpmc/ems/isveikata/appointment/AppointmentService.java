package lt.vtvpmc.ems.isveikata.appointment;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AppointmentService {

    @Autowired
    private JpaAppointmentRepository jpaAppointmentRepository;

}
