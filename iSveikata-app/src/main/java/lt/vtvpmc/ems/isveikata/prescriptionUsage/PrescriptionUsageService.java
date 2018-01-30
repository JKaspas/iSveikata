package lt.vtvpmc.ems.isveikata.prescriptionUsage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PrescriptionUsageService {

    @Autowired
    private JpaPrescriptionUsageRepository prescriptionUsageRepository;
}
