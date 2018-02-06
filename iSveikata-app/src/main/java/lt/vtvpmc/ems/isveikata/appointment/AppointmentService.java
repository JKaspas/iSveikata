package lt.vtvpmc.ems.isveikata.appointment;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import lt.vtvpmc.ems.isveikata.medical_record.MedicalRecordDto;

import java.util.List;

import javax.transaction.Transactional;

@Service
@Transactional
public class AppointmentService {

    @Autowired
    private JpaAppointmentRepository jpaAppointmentRepository;
  
   

}
