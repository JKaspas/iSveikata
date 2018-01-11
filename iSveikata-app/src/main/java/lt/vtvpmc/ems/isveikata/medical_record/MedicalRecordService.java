package lt.vtvpmc.ems.isveikata.medical_record;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class MedicalRecordService {

    @Autowired
    private JpaMedicalRecordRepository jpaMedicalRecordRepository;
}
