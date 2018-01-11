package lt.vtvpmc.ems.isveikata.appointment;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AppointmentService {

    @Autowired
    private JpaAppointmentRepository jpaAppointmentRepository;

}
